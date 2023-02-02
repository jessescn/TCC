import { ActorModel } from 'domain/models/actor'
import jwt from 'jsonwebtoken'
import { IActorRepository } from 'repositories/sequelize/actor'
import { Request } from 'types/express'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'
import { UseCase } from 'usecases'
import { validatePassword } from 'utils/password'

export type Credentials = {
  email: string
  senha: string
}

type TokenInfo = {
  token: string
  verificado: boolean
  email: string
  expiresIn: string
}

export class TokenUseCase implements UseCase<TokenInfo> {
  constructor(private actorRepo: IActorRepository) {}

  private createToken = (data: ActorModel) => {
    return jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION
    })
  }

  private getActorByCredentials = async (data: Credentials) => {
    const [actor] = await this.actorRepo.findAll({ email: data.email })

    if (!actor) {
      throw new NotFoundError('Usuário não existe')
    }

    return actor
  }

  private validateCredentialsPassword = async (
    actor: ActorModel,
    data: Credentials
  ) => {
    const isPasswordValid = await validatePassword(data.senha, actor.senha)

    if (!isPasswordValid) {
      throw new UnauthorizedError('Email ou senha inválidos')
    }
  }

  execute = async (request: Request) => {
    const data = request.body as Credentials

    const actor = await this.getActorByCredentials(data)

    await this.validateCredentialsPassword(actor, data)

    const token = this.createToken(actor)

    return {
      token,
      verificado: actor.verificado,
      email: actor.email,
      expiresIn: process.env.JWT_TOKEN_EXPIRATION
    }
  }
}
