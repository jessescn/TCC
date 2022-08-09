import {
  checkPermissionResource,
  CrudController,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { CampoFormulario } from 'models/formulario'
import { FormularioService } from 'services/entities/formulario-service'
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

      const newFormulario = await FormularioService.create({
        ...data,
        createdBy: req.user.id
      })

      res.status(HttpStatusCode.created).json(newFormulario)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.form_read

      checkPermissionResource(permission, req)

      const formularios = await FormularioService.getAll()

      res.json(formularios)
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

      const formulario = await FormularioService.getById(Number(id))

      res.json(formulario)
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

      const updatedFormulario = await FormularioService.update(Number(id), data)

      res.json(updatedFormulario)
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

      const deletedFormulario = await FormularioService.destroy(Number(id))

      res.json(deletedFormulario)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
