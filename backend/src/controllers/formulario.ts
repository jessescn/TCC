import {
  checkPermissionResource,
  CrudController,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { CampoFormulario } from 'models/formulario'
import {
  FormularioQuery,
  FormularioService
} from 'services/entities/formulario-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'

export type RemoteFormulario = {
  nome: string
  descricao?: string
  campos: CampoFormulario[]
}

export const FormularioController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.form_create

      checkPermissionResource(permission, req)

      const data: RemoteFormulario = req.body

      const mandatoryFields = ['nome', 'campos']

      validateMandatoryFields(mandatoryFields, data)

      const newResource = await FormularioService.create({
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
      const permission = req.user.permissoes.form_read

      const query: FormularioQuery =
        permission === 'owned' ? { createdBy: req.user.id } : {}

      const resource = await FormularioService.getAll(query)

      res.json(resource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.form_read

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const resource = await FormularioService.getById(Number(id))

      res.json(resource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body

      const permission = req.user.permissoes.form_update

      checkPermissionResource(permission, req)

      if (!data || !isNumber(id)) {
        throw new BadRequestError()
      }

      const updatedResource = await FormularioService.update(Number(id), data)

      res.json(updatedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.form_delete

      checkPermissionResource(permission, req)

      if (!isNumber(id)) {
        throw new BadRequestError()
      }

      const deletedResource = await FormularioService.destroy(Number(id))

      res.json(deletedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
