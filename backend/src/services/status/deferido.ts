import { Status } from 'domain/models/procedimento'
import { IMailRepository } from 'repository'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class DeferidoStatusHandler implements StatusHandler {
  private mailRepo: IMailRepository

  constructor(mailRepo: IMailRepository) {
    this.mailRepo = mailRepo
  }

  execute = async ({ procedimento, autor }: HandlerProps) => {
    const sendEmailSecretaria = async () => {
      // definir melhor quais emails devem ser enviados nessa etapa
      // envia um email a secretaria contendo as informacões necessárias para dar continuidade ao procedimento

      const email = templates['approve-procedimento'](autor.email, {
        procedimento
      })

      await this.mailRepo.send(email)
    }

    await sendEmailSecretaria()

    const status: Status = {
      status: 'deferido',
      data: new Date().toISOString()
    }

    return status
  }
}
