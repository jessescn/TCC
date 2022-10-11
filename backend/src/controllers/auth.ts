import { errorResponseHandler } from 'controllers'
import jwt from 'jsonwebtoken'
import { IActorService } from 'services/actor'
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
  constructor(private readonly service: IActorService) {}

  token = async (req: Request, res: Response) => {
    try {
      const data: Credentials = req.body

      if (!data.email || !data.password) {
        throw new BadRequestError()
      }

      const [actor] = await this.service.findAll({ email: data.email })

      if (!actor) {
        throw new NotFoundError()
      }

      const isPasswordValid = await isValidPassword(data.password, actor.senha)

      if (!isPasswordValid) {
        throw new UnauthorizedError()
      }

      const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY)

      res.json({ token, expiresIn: process.env.JWT_TOKEN_EXPIRATION })
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }

  me = async (req: Request, res: Response) => {
    try {
      res.json(req.actor)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
