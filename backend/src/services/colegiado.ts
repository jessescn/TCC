import { ActorHelper } from 'domain/helpers/actor'
import { ProcedimentoHelper } from 'domain/helpers/procedimento'
import { ProcedimentoModel, Status, TStatus } from 'domain/models/procedimento'
import { VotoModel } from 'domain/models/voto'
import { IActorRepository } from 'repositories/sequelize/actor'
import { IProcedimentoRepo } from 'repositories/sequelize/procedimento'
import { CreateVoto } from 'repositories/sequelize/voto'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { IVotoRepository } from './../repositories/sequelize/voto'
import { IProcedimentoStatusService } from './procedimento-status'

export interface IColegiadoService {
  vote: (vote: CreateVoto) => Promise<ProcedimentoModel>
  deleteVote: (
    procedimentoId: number,
    autor: number
  ) => Promise<ProcedimentoModel>
  homologate: (id: number) => Promise<ProcedimentoModel>
}

export class ColegiadoService implements IColegiadoService {
  constructor(
    private repository: IProcedimentoRepo,
    private statusService: IProcedimentoStatusService,
    private actorRepository: IActorRepository,
    private votoRepository: IVotoRepository
  ) {}

  private async handleMajorityVotes(
    procedimento: ProcedimentoModel,
    votos: VotoModel[]
  ) {
    const novoStatus: TStatus = ProcedimentoHelper.isProcedimentoAprovado(votos)
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

  async vote(data: CreateVoto) {
    await this.checkIfProcedimentoCanUpdateVote(data.procedimentoId)

    await this.votoRepository.createOrUpdate(data)

    const votos: VotoModel[] = await this.votoRepository.findAll({
      procedimentoId: data.procedimentoId
    })

    const numberOfColegiados = await this.getNumberOfColegiados()

    const isMaioriaVotos = ProcedimentoHelper.isMaioria(
      votos,
      numberOfColegiados
    )

    const procedimento = await this.repository.findOne(data.procedimentoId)

    if (isMaioriaVotos) {
      return this.handleMajorityVotes(procedimento, votos)
    }

    return procedimento
  }

  async deleteVote(procedimentoId: number, autor: number) {
    await this.checkIfProcedimentoCanUpdateVote(procedimentoId)

    const [currentVoto] = await this.votoRepository.findAll({
      autorId: autor,
      procedimentoId
    })

    if (!currentVoto) {
      throw new NotFoundError('Voto não encontrado')
    }

    await this.votoRepository.destroy(currentVoto.id)

    const procedimento = await this.repository.findOne(procedimentoId)

    return procedimento
  }
}
