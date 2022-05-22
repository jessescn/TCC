import { Request, Response, HttpStatusCode } from 'types/express'
import { CrudController } from './crud'
import { UserModel } from 'types/user'
import { UserService } from 'services/user-service'

export type RemoteUser = {
  name: string
  email: string
  password: string
}

export const UserController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteUser = req.body

      if (!data.email || !data.name || !data.password) {
        res.status(HttpStatusCode.badRequest).send()
        return
      }

      const emailAlreadyUsed = await UserService.getByEmail(data.email)

      if (emailAlreadyUsed) {
        res.status(HttpStatusCode.badRequest).send('email already used')
        return
      }

      const user = await UserService.create(data)

      res.json(user)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!id) {
        const users = await UserService.getAll()

        res.json(users)
        return
      }

      const user = await UserService.getById(Number(id))

      if (!user) {
        res.status(HttpStatusCode.notFound).send()
        return
      }

      res.json(user)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data: UserModel = req.body

      if (!data) {
        res.status(HttpStatusCode.badRequest).send()
        return
      }

      const updatedUser = await UserService.update(Number(id), data)

      if (!updatedUser) {
        res.status(HttpStatusCode.notFound).send()
        return
      }

      res.json(updatedUser)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const userDestroyed = await UserService.destroy(Number(id))

      if (!userDestroyed) {
        res.status(HttpStatusCode.notFound).send()
        return
      }

      res.json(userDestroyed)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  }
}
