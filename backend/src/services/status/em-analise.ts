import { Status } from 'models/procedimento'
import { IMailRepository, IRepository } from 'repository'
import templates from 'templates'
import { Usuario } from 'usecases/usuario'
import { HandlerProps, StatusHandler } from '.'

export class EmAnaliseStatusHandler implements StatusHandler {
  private usuarioRepo: IRepository
  private mailRepo: IMailRepository

  constructor(usuarioRepo: IRepository, mailRepo: IMailRepository) {
    this.usuarioRepo = usuarioRepo
    this.mailRepo = mailRepo
  }

  execute = async ({ procedimento }: HandlerProps) => {
    const sendEmailCoordenacao = async () => {
      // Envia email a coordenacão avisando de um novo procedimento está pronto para ser analisado
      const usuarios = await this.usuarioRepo.findAll({})
      const coordenacaoUsers = Usuario.findByRole(usuarios, 'coordenacao')

      if (coordenacaoUsers.length === 0) return

      const mailList = coordenacaoUsers.map(user => user.email).toString()

      const email = templates['analise-procedimento-coordenacao'](mailList, {
        procedimento
      })

      await this.mailRepo.send(email)
    }

    await sendEmailCoordenacao()

    const statusAnalise: Status = {
      status: 'em_analise',
      data: new Date().toISOString()
    }

    return statusAnalise
  }
}
