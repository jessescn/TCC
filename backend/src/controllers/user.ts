import { Request, Response } from '../types/express'
import User from '../models/user'
import { CrudController } from './crud'

type RemoteUser = {
  name: string
  email: string
  password: string
}

export const UserController: CrudController = {
  create: async (req: Request, res: Response) => {
    try {
      const data: RemoteUser = req.body

      const emailAlreadyUsed = await User.findOne({
        where: { email: data.email }
      })

      if (emailAlreadyUsed) {
        res.status(400).send('email already used')
        return
      }

      const user = await User.create(data)

      res.send(user)
    } catch (error) {
      res.status(500).send()
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!id) {
        const users = await User.findAll()

        return res.send(users)
      }

      const user = await User.findByPk(id)

      if (!user) return res.status(404).send()

      res.json(user)
    } catch (error) {
      res.status(500).send()
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const data: User = req.body

      const userExists = await User.findByPk(id)

      if (!userExists) {
        res.status(404).send()
        return
      }

      userExists.set({
        ...data
      })

      await userExists.save()

      res.send(userExists)
    } catch (error) {
      res.status(500).send()
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findByPk(id)

      if (!user) {
        res.status(404).send()
        return
      }

      user.destroy()

      res.send(user)
    } catch (error) {
      res.status(500).send()
    }
  }
}
