import { ActorModel } from 'domain/models/actor'
import {
  ProcedimentoModel,
  Status,
  statusList,
  TStatus
} from 'domain/models/procedimento'
import { MailSender } from 'repositories/nodemailer/mail'
import { IActorRepository } from 'repositories/sequelize/actor'
import templates from 'templates'
import { getCurrentTStatus } from 'utils/value'
import { StatusHandlerMap } from './status'

export interface IProcedimentoStatusService {
  execute: (
    procedimento: ProcedimentoModel,
    novoStatus: TStatus
  ) => Promise<Status>
}

export class ProcedimentoStatusService implements IProcedimentoStatusService {
  constructor(private actorRepo: IActorRepository) {}

  private sendUpdateStatusEmail = async (
    autor: ActorModel,
    procedimento: ProcedimentoModel,
    status: Status,
    previous: Status = undefined
  ) => {
    const email = templates['update-procedimento-status'](autor.email, {
      procedimento,
      novoStatus: statusList[status.status].label,
      statusAntigo: previous ? statusList[previous.status].label : undefined,
      dataAtualizacao: status.data
    })

    await MailSender.send(email)
  }

  async execute(procedimento: ProcedimentoModel, novoStatus: TStatus) {
    const autor = await this.actorRepo.findOne(procedimento.createdBy)

    const previous = getCurrentTStatus(procedimento)

    const status = await StatusHandlerMap[novoStatus].execute({
      autor,
      procedimento
    })

    await this.sendUpdateStatusEmail(autor, procedimento, status, previous)

    return status
  }
}
