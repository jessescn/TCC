import { Status } from 'domain/models/procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class DeferidoStatusHandler implements StatusHandler {
  execute = async ({ procedimento, autor }: HandlerProps) => {
    const sendEmailSecretaria = async () => {
      // definir melhor quais emails devem ser enviados nessa etapa
      // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao procedimento
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
