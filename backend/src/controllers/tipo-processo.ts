import {
  checkPermissionResource,
  CrudController,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'
import { TipoProcessoService } from './../services/entities/tipo-processo-service'

export type RemoteTipoProcesso = {
  nome: string
  descricao?: string
  dataInicio?: string
  dataFim?: string
  escopo: string
  colegiado: boolean
  formularios: number[]
}

export const TipoProcessoController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteTipoProcesso = req.body

      const mandatoryFields = ['nome', 'escopo', 'colegiado']

      validateMandatoryFields(mandatoryFields, data)

      const newResource = await TipoProcessoService.create({
        ...data,
        createdBy: req.user.id
      })

      res.status(HttpStatusCode.created).json(newResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.tipo_processo_read

      const query = permission === 'owned' ? { createdBy: req.user.id } : {}

      const resources = await TipoProcessoService.getAll(query)

      res.send(resources)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.tipo_processo_read

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const resource = await TipoProcessoService.getById(Number(id))

      res.json(resource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body

      const permission = req.user.permissoes.tipo_processo_update

      checkPermissionResource(permission, req)

      if (!data || !isNumber(id)) {
        throw new BadRequestError()
      }

      const updatedResource = await TipoProcessoService.update(Number(id), data)

      res.json(updatedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.tipo_processo_delete

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const deletedResource = await TipoProcessoService.destroy(Number(id))

      res.json(deletedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
