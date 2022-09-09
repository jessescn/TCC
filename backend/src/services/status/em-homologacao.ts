import { Status } from 'models/procedimento'
import { IMailRepository, IRepository } from 'repository'
import templates from 'templates'
import { Usuario } from 'usecases/usuario'
import { HandlerProps, StatusHandler } from '.'

export class EmHomologacaoStatusHandler implements StatusHandler {
  private usuarioRepo: IRepository
  private mailRepo: IMailRepository

  execute = async ({ procedimento }: HandlerProps) => {
    const sendEmailColegiado = async () => {
      // Envia email aos membros do colegiado avisando que um novo procedimento está para ser votado
      const usuarios = await this.usuarioRepo.findAll({})
      const colegiado = await Usuario.findByRole(usuarios, 'colegiado')

      if (colegiado.length === 0) return

      const mailList = colegiado.map(user => user.email).toString()

      const email = templates['homologacao-colegiado'](mailList, {
        procedimento
      })

      await this.mailRepo.send(email)
    }

    await sendEmailColegiado()

    const statusHomologacao: Status = {
      status: 'em_homologacao',
      data: new Date().toISOString()
    }

    return statusHomologacao
  }
}
