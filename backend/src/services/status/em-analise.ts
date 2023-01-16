import { ActorHelper } from 'domain/helpers/actor'
import { ProcedimentoModel, Status } from 'domain/models/procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import { IActorRepository } from 'repositories/sequelize/actor'
import templates from 'templates'
import { HandlerProps, StatusHandler } from '.'

export class EmAnaliseStatusHandler implements StatusHandler {
  constructor(private actorRepo: IActorRepository) {}

  private sendEmailCoordenacao = async (procedimento: ProcedimentoModel) => {
    // Envia email a coordenacão avisando de um novo procedimento está pronto para ser analisado
    const actors = await this.actorRepo.findAll({})
    const coordenacaoUsers = ActorHelper.filterByRole(actors, 'coordenacao')

    if (coordenacaoUsers.length === 0) return

    const mailList = coordenacaoUsers.map(user => user.email).toString()

    const email = templates['analise-procedimento-coordenacao'](mailList, {
      procedimento
    })

    await MailSender.send(email)
  }

  execute = async ({ procedimento }: HandlerProps) => {
    this.sendEmailCoordenacao(procedimento)

    const statusAnalise: Status = {
      status: 'em_analise',
      data: new Date().toISOString()
    }

    return statusAnalise
  }
}
