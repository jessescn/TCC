import {
  checkPermissionResource,
  CrudController,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import {
  RemoteUser,
  UserQuery,
  UserService
} from 'services/entities/user-service'
import { Default } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'

export const UserController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteUser = req.body

      const mandatoryFields = ['email', 'nome', 'senha']

      validateMandatoryFields(mandatoryFields, data)

      const user = await UserService.create({ ...data, permissoes: Default })

      res.status(HttpStatusCode.created).json(user)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.user_read

      const query: UserQuery = permission === 'owned' ? { id: req.user.id } : {}

      const users = await UserService.getAll(query)

      res.json(users)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const permission = req.user.permissoes.user_read

      checkPermissionResource(permission, req)

      const user = await UserService.getById(Number(id))

      res.json(user)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data = req.body

      const permission = req.user.permissoes.user_update

      checkPermissionResource(permission, req)

      if (!data) {
        throw new BadRequestError()
      }

      const updatedUser = await UserService.update(Number(id), data)

      res.json(updatedUser)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.user_delete

      checkPermissionResource(permission, req)

      const user = await UserService.destroy(Number(id))

      res.json(user)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
