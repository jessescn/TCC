import { UnauthorizedError } from '../types/express/errors'
import {
  checkPermissionResource,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import {
  RemoteUser,
  UserQuery,
  UsuarioService
} from 'services/entities/usuario-service'
import { Default } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'

export const UsuarioController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteUser = req.body

      const mandatoryFields = ['email', 'nome', 'senha']

      validateMandatoryFields(mandatoryFields, data)

      const newResource = await UsuarioService.create({
        ...data,
        permissoes: Default
      })

      res.status(HttpStatusCode.created).json(newResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const permission = req.user.permissoes.user_read

      checkPermissionResource(permission, req)

      const query: UserQuery = permission === 'owned' ? { id: req.user.id } : {}

      const resources = await UsuarioService.getAll(query)

      res.json(resources)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const permission = req.user.permissoes.user_read

      checkPermissionResource(permission, req)

      if (permission === 'owned' && Number(id) !== req.user.id) {
        throw new UnauthorizedError()
      }

      const resource = await UsuarioService.getById(Number(id))

      res.json(resource)
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

      if (permission === 'owned' && Number(id) !== req.user.id) {
        throw new UnauthorizedError()
      }

      const updatedResource = await UsuarioService.update(Number(id), data)

      res.json(updatedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const permission = req.user.permissoes.user_delete

      checkPermissionResource(permission, req)

      if (permission === 'owned' && Number(id) !== req.user.id) {
        throw new UnauthorizedError()
      }

      const deletedResource = await UsuarioService.destroy(Number(id))

      res.json(deletedResource)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  publicos: async (req: Request, res: Response) => {
    try {
      const resources = await UsuarioService.getAllPublicos()

      return res.json(resources)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
