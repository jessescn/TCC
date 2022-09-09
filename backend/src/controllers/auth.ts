import { errorResponseHandler } from 'controllers'
import jwt from 'jsonwebtoken'
import { IRepository } from 'repository'
import { UsuarioRepository } from 'repository/sequelize/usuario'
import { Request, Response } from 'types/express'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { isValidPassword } from 'utils/password'

type Credentials = {
  email: string
  password: string
}

export class AuthController {
  private repository: UsuarioRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  token = async (req: Request, res: Response) => {
    try {
      const data: Credentials = req.body

      if (!data.email || !data.password) {
        throw new BadRequestError()
      }

      const [user] = await this.repository.findAll({ email: data.email })

      if (!user) {
        throw new NotFoundError()
      }

      const isPasswordValid = await isValidPassword(data.password, user.senha)

      if (!isPasswordValid) {
        throw new UnauthorizedError()
      }

      const token = jwt.sign({ data: user }, process.env.JWT_SECRET_KEY)

      res.json({ token, expiresIn: process.env.JWT_TOKEN_EXPIRATION })
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }

  me = async (req: Request, res: Response) => {
    try {
      res.json(req.user)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
