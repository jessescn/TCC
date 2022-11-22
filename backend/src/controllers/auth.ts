import { errorResponseHandler } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import jwt from 'jsonwebtoken'
import { PaginationResponse } from 'repositories'
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
  senha: string
}

export class AuthController {
  constructor(private readonly service: IActorService) {}

  token = async (req: Request, res: Response) => {
    try {
      const data: Credentials = req.body

      if (!data.email || !data.senha) {
        throw new BadRequestError()
      }

      const result = (await this.service.findAll(
        {
          email: data.email
        },
        { page: 1, per_page: 1000, term: null }
      )) as PaginationResponse<ActorModel>

      const [actor] = result.data

      if (!actor) {
        throw new NotFoundError('Usuário não existe')
      }

      const isPasswordValid = await isValidPassword(data.senha, actor.senha)

      if (!isPasswordValid) {
        throw new UnauthorizedError('Email ou senha inválidos')
      }

      const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION
      })

      res.json({ token, expiresIn: process.env.JWT_TOKEN_EXPIRATION })
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }

  me = async (request: Request, response: Response) => {
    try {
      const { actor } = request

      if (!actor) {
        throw new UnauthorizedError('token inválido')
      }

      response.json(request.actor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
