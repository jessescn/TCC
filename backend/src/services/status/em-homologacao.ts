import { ActorHelper } from 'domain/helpers/actor'
import { ProcedimentoModel, Status } from 'domain/models/procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import { IActorRepository } from 'repositories/sequelize/actor'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class EmHomologacaoStatusHandler implements StatusHandler {
  constructor(private readonly actorRepo: IActorRepository) {}

  private sendEmailColegiado = async (procedimento: ProcedimentoModel) => {
    // Envia email aos membros do colegiado avisando que um novo procedimento está para ser votado
    const usuarios = await this.actorRepo.findAll()
    const colegiado = ActorHelper.filterByRole(usuarios, 'colegiado')

    if (colegiado.length === 0) return

    const mailList = colegiado.map(user => user.email).toString()

    const email = templates['homologacao-colegiado'](mailList, {
      procedimento
    })

    await MailSender.send(email)
  }

  execute = async ({ procedimento }: HandlerProps) => {
    await this.sendEmailColegiado(procedimento)

    const statusHomologacao: Status = {
      status: 'em_homologacao',
      data: new Date().toISOString()
    }

    return statusHomologacao
  }
}
