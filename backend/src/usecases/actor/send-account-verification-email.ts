import { ActorModel } from 'domain/models/actor'
import { Request } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { UseCase } from 'usecases'
import jwt from 'jsonwebtoken'
import templates from 'templates'
import { MailSender } from 'repositories/nodemailer/mail'

export class SendAccountVerificationEmailUseCase implements UseCase {
  private checkIfActorIsAlreadyVerified(actor: ActorModel) {
    if (actor.verificado) {
      throw new BadRequestError('usuário já verificado')
    }
  }

  private createToken(data: ActorModel) {
    const token = jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
      expiresIn: '5m'
    })

    return token
  }

  private mountRedirectLink(token: string) {
    const baseUrl = process.env.WEB_URL || 'http://localhost:3000'
    const link = `${baseUrl}/confirmacao-email/${token}`

    return link
  }

  private buildVerificationEmail(actorEmail: string, redirectLink: string) {
    const emailVerificationTemplate = templates['verificacao-email']
    return emailVerificationTemplate(actorEmail, { link: redirectLink })
  }

  execute = async (request: Request) => {
    const { actor } = request

    this.checkIfActorIsAlreadyVerified(actor)

    const token = this.createToken(actor)
    const redirectLink = this.mountRedirectLink(token)
    const emailTemplate = this.buildVerificationEmail(actor.email, redirectLink)

    await MailSender.send(emailTemplate)
  }
}
