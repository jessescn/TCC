import {
  ProcedimentoModel,
  Status,
  TStatus,
  VotoProcedimento
} from 'domain/models/procedimento'
import { ProcedimentoHelper } from 'domain/helpers/procedimento'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { IProcedimentoStatusService } from './procedimento-status'
import { IProcedimentoRepo } from 'repositories/sequelize/procedimento'

export interface IColegiadoService {
  updateVote: (id: number, vote: VotoProcedimento) => Promise<ProcedimentoModel>
  deleteVote: (id: number, autor: number) => Promise<ProcedimentoModel>
  homologate: (id: number) => Promise<ProcedimentoModel>
}

export class ColegiadoService implements IColegiadoService {
  private numberOfColegiados: number

  constructor(
    private repository: IProcedimentoRepo,
    private statusService: IProcedimentoStatusService
  ) {
    this.numberOfColegiados = parseInt(process.env.COLEGIADO_QUANTITY || '0')
  }

  private async handleMajorityVotes(procedimento: ProcedimentoModel) {
    const novoStatus: TStatus = ProcedimentoHelper.isProcedimentoAprovado(
      procedimento
    )
      ? 'deferido'
      : 'indeferido'

    const status = await this.statusService.execute(procedimento, novoStatus)

    return this.repository.updateStatus(procedimento.id, status)
  }

  private async checkIfProcedimentoExists(id: number) {
    const procedimento = await this.repository.findOne(id)

    if (!procedimento) {
      throw new NotFoundError()
    }

    return procedimento
  }

  private checkIfProcedimentoIsOnHomologation(procedimento: ProcedimentoModel) {
    const status = ProcedimentoHelper.getCurrentStatus(procedimento)

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

    const newStatus: Status = {
      data: new Date().toISOString(),
      status
    }

    return this.repository.updateStatus(id, newStatus)
  }

  async homologate(id: number) {
    return this.updateStatus(id, 'deferido')
  }

  async updateVote(id: number, data: VotoProcedimento) {
    await this.checkIfProcedimentoCanUpdateVote(id)

    const procedimento = await this.repository.updateVote(id, data)

    const isMaioriaVotos = ProcedimentoHelper.isMaioria(
      procedimento.votos,
      this.numberOfColegiados
    )

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
