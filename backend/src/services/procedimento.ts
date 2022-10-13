import {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Revisao,
  TStatus
} from 'domain/models/procedimento'
import { ActorModel } from 'domain/models/actor'
import { ProcedimentoHelper } from 'domain/helpers/procedimento'
import { TipoProcedimentoHelper } from 'domain/helpers/tipo-procedimento'
import { IProcedimentoRepo, IRepository } from 'repository'
import {
  NewProcedimento,
  NewRevisao,
  ProcedimentoQuery,
  ProcedimentoRepository
} from 'repository/sequelize/procedimento'
import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { IService } from 'services'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { IProcedimentoStatusService } from './procedimento-status'

export interface IProcedimentoService
  extends IService<ProcedimentoModel, ProcedimentoQuery> {
  create: (
    actor: ActorModel,
    data: NewProcedimento
  ) => Promise<ProcedimentoModel>
  update: (
    id: number,
    data: Partial<ProcedimentoModel>
  ) => Promise<ProcedimentoModel>
  newReview: (
    id: number,
    actor: ActorModel,
    review: NewRevisao
  ) => Promise<ProcedimentoModel>
  updateStatus: (id: number, status: TStatus) => Promise<ProcedimentoModel>
}

export class ProcedimentoService implements IProcedimentoService {
  private procedimentoRepo: ProcedimentoRepository
  private tipoProcedimentoRepo: TipoProcedimentoRepository
  private statusService: IProcedimentoStatusService

  constructor(
    procedimentoRepo: IProcedimentoRepo,
    tipoProcedimentoRepo: IRepository,
    statusService: IProcedimentoStatusService
  ) {
    this.procedimentoRepo = procedimentoRepo
    this.tipoProcedimentoRepo = tipoProcedimentoRepo
    this.statusService = statusService
  }

  private async checkIfTipoProcedimentoExists(tipo: number) {
    const tipoProcedimento = await this.tipoProcedimentoRepo.findOne(tipo)

    if (!tipoProcedimento) {
      throw new BadRequestError('tipo procedimento not found')
    }

    return tipoProcedimento
  }

  private async checkIfUserBelongsToPublico(actor: ActorModel, tipo: number) {
    const tipoProcedimento = await this.checkIfTipoProcedimentoExists(tipo)

    if (!TipoProcedimentoHelper.belongsToPublico(actor, tipoProcedimento)) {
      throw new UnauthorizedError(
        'Does not have permission to this procedimento'
      )
    }
  }

  private async checkIfProcedimentoExists(id: number) {
    const procedimento = await this.procedimentoRepo.findOne(id)

    if (!procedimento) {
      throw new NotFoundError()
    }

    return procedimento
  }

  private checkIfProcedimentoCanUpdateResposta(
    procedimento: ProcedimentoAttributes
  ) {
    const isOnPendingChangesStatus =
      ProcedimentoHelper.getCurrentStatus(procedimento) ===
      'correcoes_pendentes'

    if (!isOnPendingChangesStatus) {
      throw new BadRequestError('Cannot update in this current status')
    }
  }

  private async updateCreatedProcedimentoStatus(
    created: ProcedimentoAttributes
  ) {
    const status = await this.statusService.execute(created, 'em_analise')

    const procedimento = await this.procedimentoRepo.updateStatus(
      created.id,
      status
    )

    return procedimento
  }

  async create(actor: ActorModel, data: NewProcedimento) {
    await this.checkIfUserBelongsToPublico(actor, data.tipo)

    const created = await this.procedimentoRepo.create({
      respostas: data.respostas,
      tipo: data.tipo,
      createdBy: actor.id,
      votos: []
    })

    return this.updateCreatedProcedimentoStatus(created)
  }

  async delete(id: number) {
    await this.checkIfProcedimentoExists(id)

    return this.procedimentoRepo.destroy(id)
  }

  async findOne(id: number) {
    return this.checkIfProcedimentoExists(id)
  }

  async findAll(query: ProcedimentoQuery = {}) {
    return this.procedimentoRepo.findAll(query)
  }

  async updateStatus(id: number, novoStatus: TStatus) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    const status = await this.statusService.execute(procedimento, novoStatus)

    return this.procedimentoRepo.updateStatus(id, status)
  }

  async update(id: number, data: Partial<ProcedimentoModel>) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    if (data.respostas) {
      this.checkIfProcedimentoCanUpdateResposta(procedimento)
    }

    await this.procedimentoRepo.update(id, data)

    return this.updateStatus(id, 'em_analise')
  }

  private async updateProcedimentoToNextStatus(
    procedimento: ProcedimentoAttributes,
    data: NewRevisao
  ) {
    const hasPendingChanges = !data.aprovado

    if (hasPendingChanges) {
      return this.updateStatus(procedimento.id, 'correcoes_pendentes')
    }

    const tipo = await this.tipoProcedimentoRepo.findOne(procedimento.tipo)

    const shouldForwardToColegiado = tipo.colegiado

    const nextStatus = shouldForwardToColegiado ? 'em_homologacao' : 'deferido'

    return this.updateStatus(procedimento.id, nextStatus)
  }

  async newReview(id: number, actor: ActorModel, data: NewRevisao) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    const revisao: Revisao = {
      ...data,
      data: new Date().toISOString(),
      autor: actor
    }

    await this.procedimentoRepo.newRevisao(id, revisao)

    return this.updateProcedimentoToNextStatus(procedimento, data)
  }
}
