import { errorResponseHandler } from 'controllers'
import jwt from 'jsonwebtoken'
import { UsuarioService } from 'services/entities/usuario-service'
import { Request, Response } from 'types/express'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'

type Credentials = {
  email: string
  password: string
}

export const AuthController = {
  token: async (req: Request, res: Response) => {
    try {
      const data: Credentials = req.body

      if (!data.email || !data.password) {
        throw new BadRequestError()
      }

      const user = await UsuarioService.getByEmail(data.email)

      if (!user) {
        throw new NotFoundError()
      }

      const isPasswordValid = await UsuarioService.validPassword(
        data.password,
        user.senha
      )

      if (!isPasswordValid) {
        throw new UnauthorizedError()
      }

      const token = jwt.sign({ data: user }, process.env.JWT_SECRET_KEY)

      res.json({ token, expiresIn: process.env.JWT_TOKEN_EXPIRATION })
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  me: async (req: Request, res: Response) => {
    try {
      res.json(req.user)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
