import { ActorModel } from 'domain/models/actor'
import { IActorRepository } from 'repositories/sequelize/actor'
import { Request } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { UseCase } from 'usecases'
import jwt from 'jsonwebtoken'
import templates from 'templates'
import { MailSender } from 'repositories/nodemailer/mail'

export class SendChangePasswordEmailUseCase implements UseCase {
  constructor(private actorRepo: IActorRepository) {}

  private createToken = (actor: ActorModel) => {
    const token = jwt.sign({ data: actor }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    })

    return token
  }

  private mountRedirectLink = (code: string, email: string) => {
    const baseUrl = process.env.WEB_URL || 'http://localhost:3000'
    const link = `${baseUrl}/alteracao-senha/${code}?email=${email}`
    return link
  }

  private getActorByEmail = async (email: string) => {
    const [actor] = await this.actorRepo.findAll({ email })

    if (!actor) {
      throw new NotFoundError('Não existe usuário com esse email')
    }

    return actor
  }

  private buildChangePasswordEmail = (
    actor: ActorModel,
    redirectLink: string
  ) => {
    const changePasswordEmailTemplate = templates['change-password']
    const data = {
      link: redirectLink,
      name: actor.nome
    }

    return changePasswordEmailTemplate(actor.email, data)
  }

  execute = async (request: Request) => {
    const { email } = request.body

    const actor = await this.getActorByEmail(email)
    const code = this.createToken(actor)
    const redirectLink = this.mountRedirectLink(code, email)
    const emailTemplate = this.buildChangePasswordEmail(actor, redirectLink)

    await MailSender.send(emailTemplate)
  }
}
