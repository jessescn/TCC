import { makeMailRepository } from 'factories/repositories/mail-factory'
import {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Status,
  statusList,
  TStatus,
  VotoProcedimento
} from 'domain/models/procedimento'
import templates from 'templates'
import { StatusHandlerMap } from './status'
import { UserModel } from 'domain/models/user'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export class ProcedimentoStatusService {
  private static usuarioRepo = makeUsuarioRepository()
  private static mailRepo = makeMailRepository()

  private static sendUpdateStatusEmail = async (
    autor: UserModel,
    procedimento: ProcedimentoModel,
    status: Status
  ) => {
    const email = templates['update-procedimento-status'](autor.email, {
      procedimento,
      novoStatus: statusList[status.status].label
    })

    await this.mailRepo.send(email)
  }

  static isProcedimentoAprovado = (votes: VotoProcedimento[]) => {
    const positive = votes.filter(vote => vote.aprovado).length
    const negative = votes.length - positive

    return positive > negative
  }

  static changeProcedimentoStatus = async (
    procedimento: ProcedimentoAttributes,
    novoStatus: TStatus
  ): Promise<ProcedimentoModel> => {
    const autor = await this.usuarioRepo.findOne(procedimento.createdBy)

    const status = await StatusHandlerMap[novoStatus].execute({
      autor,
      procedimento
    })

    procedimento.set({ status: [...procedimento.status, status] })

    await procedimento.save()

    await this.sendUpdateStatusEmail(autor, procedimento, status)

    return procedimento
  }
}
