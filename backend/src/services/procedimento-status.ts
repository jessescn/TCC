import {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Status,
  statusList,
  TStatus
} from 'domain/models/procedimento'
import { ActorModel } from 'domain/models/actor'
import { IRepository } from 'repositories'
import { MailSender } from 'repositories/nodemailer/mail'
import { ActorRepository } from 'repositories/sequelize/actor'
import templates from 'templates'
import { StatusHandlerMap } from './status'

export interface IProcedimentoStatusService {
  execute: (
    procedimento: ProcedimentoAttributes,
    novoStatus: TStatus
  ) => Promise<Status>
}

export class ProcedimentoStatusService implements IProcedimentoStatusService {
  private actorRepo: ActorRepository

  constructor(actorRepo: IRepository) {
    this.actorRepo = actorRepo
  }

  private sendUpdateStatusEmail = async (
    autor: ActorModel,
    procedimento: ProcedimentoModel,
    status: Status
  ) => {
    const email = templates['update-procedimento-status'](autor.email, {
      procedimento,
      novoStatus: statusList[status.status].label
    })

    await MailSender.send(email)
  }

  async execute(procedimento: ProcedimentoAttributes, novoStatus: TStatus) {
    const autor = await this.actorRepo.findOne(procedimento.createdBy)

    const status = await StatusHandlerMap[novoStatus].execute({
      autor,
      procedimento
    })

    await this.sendUpdateStatusEmail(autor, procedimento, status)

    return status
  }
}
