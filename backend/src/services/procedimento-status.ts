import {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Status,
  statusList,
  TStatus
} from 'domain/models/procedimento'
import { UserAttributes } from 'domain/models/user'
import { IRepository } from 'repository'
import { MailSender } from 'repository/nodemailer/mail'
import { UsuarioRepository } from 'repository/sequelize/usuario'
import templates from 'templates'
import { StatusHandlerMap } from './status'

export interface IProcedimentoStatusService {
  execute: (
    procedimento: ProcedimentoAttributes,
    novoStatus: TStatus
  ) => Promise<Status>
}

export class ProcedimentoStatusService implements IProcedimentoStatusService {
  private usuarioRepo: UsuarioRepository

  constructor(usuarioRepo: IRepository) {
    this.usuarioRepo = usuarioRepo
  }

  private sendUpdateStatusEmail = async (
    autor: UserAttributes,
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
    const autor = await this.usuarioRepo.findOne(procedimento.createdBy)

    const status = await StatusHandlerMap[novoStatus].execute({
      autor,
      procedimento
    })

    await this.sendUpdateStatusEmail(autor, procedimento, status)

    return status
  }
}
