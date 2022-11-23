import { ActorModel } from 'domain/models/actor'
import { ProcedimentoModel, Status } from 'domain/models/procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class DeferidoStatusHandler implements StatusHandler {
  private sendEmailSecretaria = async (
    procedimento: ProcedimentoModel,
    autor: ActorModel
  ) => {
    // definir melhor quais emails devem ser enviados nessa etapa
    // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao procedimento
    const emailSecretaria = process.env.SECRETARIA_EMAIL || ''

    const email = templates['approve-procedimento'](emailSecretaria, {
      procedimento
    })

    await MailSender.send(email)
  }

  execute = async ({ procedimento, autor }: HandlerProps) => {
    await this.sendEmailSecretaria(procedimento, autor)

    const status: Status = {
      status: 'deferido',
      data: new Date().toISOString()
    }

    return status
  }
}
