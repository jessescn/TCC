import {
  checkPermissionResource,
  CrudController,
  errorResponseHandler
} from 'controllers'
import { FormService, RemoteFormulario } from 'services/entities/form-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'

export const FormularioController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteFormulario = req.body

      if (!data.nome || !data.campos) {
        throw new BadRequestError()
      }

      const form = await FormService.create({
        ...data,
        userId: req.user.id
      })

      res.status(HttpStatusCode.created).json(form)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.form_read

      const query = permission === 'owned' ? { userId: req.user.id } : {}

      const forms = await FormService.getAll(query)

      res.send(forms)
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

      const form = await FormService.getById(Number(id))

      res.json(form)
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

      const updatedForm = await FormService.update(Number(id), data)

      res.json(updatedForm)
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

      const deletedForm = await FormService.destroy(Number(id))

      res.json(deletedForm)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}