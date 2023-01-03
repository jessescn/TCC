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
import { IActorRepository } from 'repositories/sequelize/actor'
import { ActorHelper } from 'domain/helpers/actor'

export interface IColegiadoService {
  updateVote: (id: number, vote: VotoProcedimento) => Promise<ProcedimentoModel>
  deleteVote: (id: number, autor: number) => Promise<ProcedimentoModel>
  homologate: (id: number) => Promise<ProcedimentoModel>
}

export class ColegiadoService implements IColegiadoService {
  constructor(
    private repository: IProcedimentoRepo,
    private statusService: IProcedimentoStatusService,
    private actorRepository: IActorRepository
  ) {}

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

  private async getNumberOfColegiados() {
    const usuarios = await this.actorRepository.findAll({ deleted: false })
    const colegiado = ActorHelper.filterByRole(usuarios, 'colegiado')

    return colegiado.length
  }

  async updateVote(id: number, data: VotoProcedimento) {
    await this.checkIfProcedimentoCanUpdateVote(id)

    const procedimento = await this.repository.updateVote(id, data)

    const numberOfColegiados = await this.getNumberOfColegiados()

    const isMaioriaVotos = ProcedimentoHelper.isMaioria(
      procedimento.votos,
      numberOfColegiados
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
