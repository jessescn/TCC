import { HttpStatusCode, Request, Response } from 'types/express'
import { CrudController, errorResponseHandler } from 'controllers'
import { RemoteUser, UserService } from 'services/entities/user-service'
import { BadRequestError } from 'types/express/errors'

export const UserController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteUser = req.body

      if (!data.email || !data.nome || !data.senha) {
        throw new BadRequestError()
      }

      const user = await UserService.create(data)

      res.status(HttpStatusCode.created).json(user)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAll()

      res.json(users)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },

  readById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

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

      const userDestroyed = await UserService.destroy(Number(id))

      res.json(userDestroyed)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
