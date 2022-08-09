import {
  checkPermissionResource,
  CrudController,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'
import { TipoProcedimentoService } from '../services/entities/tipo-procedimento-service'

export type RemoteTipoProcedimento = {
  nome: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
  escopo: string
  publicos: string[]
  colegiado: boolean
  formularios: number[]
}

export const TipoProcedimentoController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.tipo_procedimento_create

      checkPermissionResource(permission, req)

      const data: RemoteTipoProcedimento = req.body

      const mandatoryFields = [
        'nome',
        'escopo',
        'colegiado',
        'formularios',
        'publicos'
      ]

      validateMandatoryFields(mandatoryFields, data)

      const newTipoProcedimento = await TipoProcedimentoService.create({
        ...data,
        createdBy: req.user.id
      })

      res.status(HttpStatusCode.created).json(newTipoProcedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.tipo_procedimento_read

      checkPermissionResource(permission, req)

      const tipoProcedimentos = await TipoProcedimentoService.getAll()

      res.send(tipoProcedimentos)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.tipo_procedimento_read

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const tipoProcedimento = await TipoProcedimentoService.getById(Number(id))

      res.json(tipoProcedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body

      const permission = req.user.permissoes.tipo_procedimento_update

      checkPermissionResource(permission, req)

      if (!data || !isNumber(id)) {
        throw new BadRequestError()
      }

      const updatedTipoProcedimento = await TipoProcedimentoService.update(
        Number(id),
        data
      )

      res.json(updatedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.tipo_procedimento_delete

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const deletedTipoProcedimento = await TipoProcedimentoService.destroy(
        Number(id)
      )

      res.json(deletedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
