import { Status } from 'domain/models/procedimento'
import { ActorUseCase } from 'domain/usecases/actor'
import { IRepository } from 'repository'
import { MailSender } from 'repository/nodemailer/mail'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class EmAnaliseStatusHandler implements StatusHandler {
  private usuarioRepo: IRepository

  constructor(usuarioRepo: IRepository) {
    this.usuarioRepo = usuarioRepo
  }

  execute = async ({ procedimento }: HandlerProps) => {
    const sendEmailCoordenacao = async () => {
      // Envia email a coordenacão avisando de um novo procedimento está pronto para ser analisado
      const usuarios = await this.usuarioRepo.findAll({})
      const coordenacaoUsers = ActorUseCase.filterByRole(
        usuarios,
        'coordenacao'
      )

      if (coordenacaoUsers.length === 0) return

      const mailList = coordenacaoUsers.map(user => user.email).toString()

      const email = templates['analise-procedimento-coordenacao'](mailList, {
        procedimento
      })

      await MailSender.send(email)
    }

    await sendEmailCoordenacao()

    const statusAnalise: Status = {
      status: 'em_analise',
      data: new Date().toISOString()
    }

    return statusAnalise
  }
}
