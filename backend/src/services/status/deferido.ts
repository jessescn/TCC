import { Status } from 'domain/models/procedimento'
import { IRepository } from 'repository'
import { MailSender } from 'repository/nodemailer/mail'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class DeferidoStatusHandler implements StatusHandler {
  private actorRepo: IRepository

  constructor(actorRepo: IRepository) {
    this.actorRepo = actorRepo
  }

  execute = async ({ procedimento }: HandlerProps) => {
    const sendEmailSecretaria = async () => {
      // definir melhor quais emails devem ser enviados nessa etapa
      // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao procedimento
      const autor = await this.actorRepo.findOne(procedimento.createdBy)

      const email = templates['approve-procedimento'](autor.email, {
        procedimento
      })

      await MailSender.send(email)
    }

    await sendEmailSecretaria()

    const status: Status = {
      status: 'deferido',
      data: new Date().toISOString()
    }

    return status
  }
}
