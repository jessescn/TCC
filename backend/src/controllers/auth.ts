import { HttpStatusCode, Request, Response } from 'types/express'

import jwt from 'jsonwebtoken'
import { UserService } from 'services/user-service'

type Credentials = {
  email: string
  password: string
}

export const AuthController = {
  token: async (req: Request, res: Response) => {
    try {
      const data: Credentials = req.body

      if (!data.email || !data.password) {
        res.status(HttpStatusCode.badRequest).send()
        return
      }

      const user = await UserService.getByEmail(data.email)

      if (!user) {
        res.status(HttpStatusCode.notFound).send()
        return
      }

      const isPasswordValid = await user.validPassword(data.password)

      if (!isPasswordValid) {
        res.status(HttpStatusCode.unauthorized).send()
        return
      }

      const token = jwt.sign({ data: user }, process.env.JWT_SECRET_KEY)

      res.json({ token, expiresIn: process.env.JWT_TOKEN_EXPIRATION })
    } catch (error) {
      console.log(error)

      res.status(HttpStatusCode.serverError).send(error)
    }
  },
  me: async (req: Request, res: Response) => {
    try {
      res.json(req.user)
    } catch (error) {
      res.status(HttpStatusCode.serverError).send()
    }
  }
}
