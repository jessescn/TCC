import { Status } from 'domain/models/procedimento'
import { IRepository } from 'repository'
import templates from 'templates'
import { UsuarioUseCase } from 'domain/usecases/actor'
import { HandlerProps, StatusHandler } from '.'
import { MailSender } from 'repository/nodemailer/mail'

export class EmHomologacaoStatusHandler implements StatusHandler {
  private usuarioRepo: IRepository

  execute = async ({ procedimento }: HandlerProps) => {
    const sendEmailColegiado = async () => {
      // Envia email aos membros do colegiado avisando que um novo procedimento está para ser votado
      const usuarios = await this.usuarioRepo.findAll({})
      const colegiado = UsuarioUseCase.filterByRole(usuarios, 'colegiado')

      if (colegiado.length === 0) return

      const mailList = colegiado.map(user => user.email).toString()

      const email = templates['homologacao-colegiado'](mailList, {
        procedimento
      })

      await MailSender.send(email)
    }

    await sendEmailColegiado()

    const statusHomologacao: Status = {
      status: 'em_homologacao',
      data: new Date().toISOString()
    }

    return statusHomologacao
  }
}
