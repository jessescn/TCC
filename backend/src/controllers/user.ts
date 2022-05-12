import { Request, Response, HttpStatusCode } from '../types/express'
import User from '../models/user'
import { CrudController } from './crud'

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

      const emailAlreadyUsed = await User.findOne({
        where: { email: data.email }
      })

      if (emailAlreadyUsed) {
        res.status(HttpStatusCode.badRequest).send('email already used')
        return
      }

      const user = await User.create(data)

      res.json(user)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!id) {
        const users = await User.findAll()

        res.json(users)
        return
      }

      const user = await User.findByPk(id)

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
      const data: User = req.body

      const userExists = await User.findByPk(id)

      if (!userExists) {
        res.status(HttpStatusCode.notFound).send()
        return
      }

      if (!data) {
        res.status(HttpStatusCode.badRequest).send()
        return
      }

      delete data.password // should not change password from here

      userExists.set({
        ...data
      })

      await userExists.save()

      res.json(userExists)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findByPk(id)

      if (!user) {
        res.status(HttpStatusCode.notFound).send()
        return
      }

      user.destroy()

      res.json(user)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  }
}
