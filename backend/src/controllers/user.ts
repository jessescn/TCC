import { Request, Response, HttpStatusCode } from 'types/express'
import { CrudController } from './crud'
import { UserModel } from 'types/user'
import { UserService } from 'services/user-service'
import { BadRequestError, RequestError } from 'types/express/errors'

export type RemoteUser = {
  name: string
  email: string
  password: string
}

export const errorResponseHandler = (res: Response, error: any) => {
  if (error instanceof RequestError) {
    res.status(error.status).send(error.message)
    return
  }

  res.status(HttpStatusCode.serverError).send()
}

export const UserController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteUser = req.body

      if (!data.email || !data.name || !data.password) {
        throw new BadRequestError('invalid data')
      }

      const user = await UserService.create(data)

      res.json(user)
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
      const data: UserModel = req.body

      if (!data) {
        throw new BadRequestError('invalid data')
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
