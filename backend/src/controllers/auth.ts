import { Request, Response } from '../types/express'

import User from '../models/user'
import jwt from 'jsonwebtoken'

type Credentials = {
  email: string
  password: string
}

export const AuthController = {
  token: async (req: Request, res: Response) => {
    try {
      const data: Credentials = req.body

      if (!data.email || !data.password) {
        res.status(400).send()
        return
      }

      const user = await User.findOne({ where: { email: data.email } })

      if (!user) {
        res.status(404).send('email not found')
        return
      }

      const isPasswordValid = await user.validPassword(data.password)

      if (!isPasswordValid) {
        res.status(401).send()
        return
      }

      const token = jwt.sign({ data: user }, process.env.JWT_SECRET_KEY)

      res.json({ token, expiresIn: process.env.JWT_TOKEN_EXPIRATION })
    } catch (error) {
      res.status(500).send(error)
    }
  },
  me: async (req: Request, res: Response) => {
    res.send(req.user)
  }
}
