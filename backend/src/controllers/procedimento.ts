import {
  checkPermissionResource,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import {
  Resposta,
  Revisao,
  statusList,
  VotoProcedimento
} from 'models/procedimento'
import {
  ProcedimentoQuery,
  ProcedimentoService,
  RemoteRevisao
} from 'services/entities/procedimento-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError, UnauthorizedError } from 'types/express/errors'
import { isNumber } from 'utils/value'
import { getCurrentStatus } from '../utils/procedimento'

export type RemoteProcedimento = {
  tipo: number
  respostas: Resposta[]
  votos?: VotoProcedimento[]
}

export const ProcedimentoController = {
  create: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.procedimento_create

      checkPermissionResource(permission, req)

      const data: RemoteProcedimento = req.body

      const mandatoryFields = ['respostas', 'tipo']

      validateMandatoryFields(mandatoryFields, data)

      const newProcedimento = await ProcedimentoService.create({
        createdBy: req.user.id,
        tipo: req.body.tipo,
        respostas: req.body.respostas
      })

      res.status(HttpStatusCode.created).json(newProcedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.procedimento_read

      checkPermissionResource(permission, req)

      const queryAll = {}
      const queryOwned = { createdBy: req.user.id }

      const query: ProcedimentoQuery =
        permission === 'owned' ? queryOwned : queryAll

      const procedimentos = await ProcedimentoService.getAll(query)

      return res.send(procedimentos)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.procedimento_read

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const procedimento = await ProcedimentoService.getById(Number(id))

      if (permission === 'owned' && procedimento.createdBy !== req.user.id) {
        throw new UnauthorizedError(
          'You not have permission to access this resource.'
        )
      }

      res.json(procedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body

      const permission = req.user.permissoes.procedimento_update

      checkPermissionResource(permission, req)

      if (!data || !isNumber(id)) {
        throw new BadRequestError()
      }

      const credentials = { user: req.user, permission }

      const updatedProcedimento = await ProcedimentoService.update(
        Number(id),
        credentials,
        data
      )

      if (
        data.respostas &&
        getCurrentStatus(updatedProcedimento) === 'correcoes_pendentes'
      ) {
        const procedimento = await ProcedimentoService.updateStatus(
          Number(id),
          'em_analise'
        )

        return res.json(procedimento)
      }

      res.json(updatedProcedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.procedimento_delete

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const credentials = { user: req.user, permission }
      const deletedProcedimento = await ProcedimentoService.destroy(
        Number(id),
        credentials
      )

      res.json(deletedProcedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  updateStatus: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { status } = req.body

      const permission = req.user.permissoes.procedimento_status

      checkPermissionResource(permission, req)

      if (
        !isNumber(id) ||
        !status ||
        !Object.keys(statusList).includes(status)
      ) {
        throw new BadRequestError()
      }

      const procedimento = await ProcedimentoService.updateStatus(
        Number(id),
        status
      )

      res.json(procedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  homologate: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.procedimento_homologacao

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const procedimento = await ProcedimentoService.updateStatus(
        Number(id),
        'deferido'
      )

      res.json(procedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  revisao: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.procedimento_update

      checkPermissionResource(permission, req)

      const data: RemoteRevisao = req.body

      if (!isNumber(id) || data.campos.length === 0) {
        throw new BadRequestError()
      }

      const revisao: Revisao = {
        ...data,
        data: new Date().toISOString(),
        autor: req.user
      }

      await ProcedimentoService.newRevisao(Number(id), revisao)

      const procedimento = await ProcedimentoService.updateStatus(
        Number(id),
        'correcoes_pendentes'
      )

      res.json(procedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
