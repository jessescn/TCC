import { Request } from 'types/express'
import { UseCase } from 'usecases'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'
import { ActorModel } from 'domain/models/actor'
import { IActorRepository } from 'repositories/sequelize/actor'

export class AccountVerificationUseCase implements UseCase {
  constructor(private repo: IActorRepository) {}

  private decodeCode = (code: string) => {
    const { payload } = jwt.verify(code, process.env.JWT_SECRET_KEY, {
      complete: true
    }) as JwtPayload

    return payload
  }

  private extractEmailFromCode = (code: string): string => {
    try {
      const payload = this.decodeCode(code)

      const email = payload.data.email

      if (!email) {
        throw new Error()
      }

      return email
    } catch (error) {
      throw new UnauthorizedError('código inválido ou expirado!')
    }
  }

  private getActorByEmail = async (email: string): Promise<ActorModel> => {
    const [actor] = await this.repo.findAll({ email })

    if (!actor) {
      throw new NotFoundError('usuário não encontrado')
    }

    return actor
  }

  private updateActorVerification = async (actor: ActorModel) => {
    return this.repo.update(actor.id, { verificado: true })
  }

  execute = async (request: Request) => {
    const { code } = request.body

    const email = this.extractEmailFromCode(code)
    const actor = await this.getActorByEmail(email)
    const updatedActor = await this.updateActorVerification(actor)

    return updatedActor
  }
}
