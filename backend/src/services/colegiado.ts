import {
  ProcedimentoAttributes,
  TStatus,
  VotoProcedimento
} from 'domain/models/procedimento'
import { ProcedimentoUseCase } from 'domain/usecases/procedimento'
import { IProcedimentoRepo } from 'repository'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { ProcedimentoStatusService } from './procedimento-status'

export interface IColegiadoService {
  updateVote: (
    id: number,
    vote: VotoProcedimento
  ) => Promise<ProcedimentoAttributes>
  deleteVote: (id: number, autor: number) => Promise<ProcedimentoAttributes>
  homologate: (id: number) => Promise<ProcedimentoAttributes>
}

export class ColegiadoService implements IColegiadoService {
  private repository: IProcedimentoRepo

  constructor(repository: IProcedimentoRepo) {
    this.repository = repository
  }

  private async handleMajorityVotes(procedimento: ProcedimentoAttributes) {
    const novoStatus: TStatus =
      ProcedimentoStatusService.isProcedimentoAprovado(procedimento.votos)
        ? 'deferido'
        : 'indeferido'

    return ProcedimentoStatusService.changeProcedimentoStatus(
      procedimento,
      novoStatus
    )
  }

  private async checkIfProcedimentoExists(id: number) {
    const procedimento = await this.repository.findOne(id)

    if (!procedimento) {
      throw new NotFoundError()
    }

    return procedimento
  }

  private async checkIfProcedimentoIsOnHomologation(
    procedimento: ProcedimentoAttributes
  ) {
    const status = ProcedimentoUseCase.getCurrentStatus(procedimento)

    if (status !== 'em_homologacao') {
      throw new BadRequestError('Cannot homologate from this current status.')
    }
  }

  private async checkIfProcedimentoCanUpdateVote(id: number) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    this.checkIfProcedimentoIsOnHomologation(procedimento)
  }

  private async updateStatus(id: number, status: TStatus) {
    await this.checkIfProcedimentoExists(id)

    return this.repository.updateStatus(id, status)
  }

  async homologate(id: number) {
    return this.updateStatus(id, 'deferido')
  }

  async updateVote(id: number, data: VotoProcedimento) {
    await this.checkIfProcedimentoCanUpdateVote(id)

    const procedimento = await this.repository.updateVote(id, data)

    const isMaioriaVotos = ProcedimentoUseCase.isMaioria(procedimento.votos)

    if (isMaioriaVotos) {
      return this.handleMajorityVotes(procedimento)
    }

    return procedimento
  }

  async deleteVote(id: number, autor: number) {
    await this.checkIfProcedimentoCanUpdateVote(id)

    return this.repository.removeVote(id, autor)
  }
}
