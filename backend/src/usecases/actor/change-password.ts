import { Request } from 'types/express'
import { UseCase } from 'usecases'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'
import { IActorRepository } from 'repositories/sequelize/actor'
import { ActorModel } from 'domain/models/actor'
import { encryptPassword } from 'utils/password'

export class ChangePasswordUseCase implements UseCase {
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

  private updateActorPassword = async (
    actor: ActorModel,
    newPassword: string
  ) => {
    return this.repo.update(actor.id, { senha: newPassword })
  }

  execute = async (request: Request) => {
    const { code, password } = request.body

    const email = this.extractEmailFromCode(code)
    const actor = await this.getActorByEmail(email)
    const encrypted = await encryptPassword(password)
    const updatedActor = await this.updateActorPassword(actor, encrypted)

    return updatedActor
  }
}
