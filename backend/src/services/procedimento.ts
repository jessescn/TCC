import {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Revisao,
  TStatus
} from 'domain/models/procedimento'
import { ActorModel } from 'domain/models/actor'
import { ProcedimentoHelper } from 'domain/helpers/procedimento'
import { TipoProcedimentoHelper } from 'domain/helpers/tipo-procedimento'
import {
  IProcedimentoRepo,
  IRepository,
  Pagination,
  PaginationResponse
} from 'repositories'
import {
  NewProcedimento,
  NewRevisao,
  ProcedimentoQuery
} from 'repositories/sequelize/procedimento'
import { TipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { IService } from 'services'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { IProcedimentoStatusService } from './procedimento-status'
import { getCurrentStatus, paginateList } from 'utils/value'
import { ComentarioModel } from 'domain/models/comentario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { FormularioModel } from 'domain/models/formulario'
import { ComentarioRepository } from 'repositories/sequelize/comentario'
import { FormularioRepository } from 'repositories/sequelize/formulario'

export type ProcedimentoDetails = {
  procedimento: ProcedimentoModel
  comentarios: ComentarioModel[]
  tipoProcedimento: TipoProcedimentoModel
  formularios: FormularioModel[]
}
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
  findAllByStatus: (
    status: TStatus,
    pagination?: Pagination
  ) => Promise<PaginationResponse<ProcedimentoModel>>
  details: (id: number) => Promise<ProcedimentoDetails>
}

export class ProcedimentoService implements IProcedimentoService {
  private procedimentoRepo: IProcedimentoRepo
  private tipoProcedimentoRepo: TipoProcedimentoRepository
  private formularioRepo: FormularioRepository
  private statusService: IProcedimentoStatusService
  private comentarioRepo: ComentarioRepository

  constructor(
    procedimentoRepo: IProcedimentoRepo,
    tipoProcedimentoRepo: IRepository,
    comentarioRepo: IRepository,
    formularioRepo: IRepository,
    statusService: IProcedimentoStatusService
  ) {
    this.procedimentoRepo = procedimentoRepo
    this.tipoProcedimentoRepo = tipoProcedimentoRepo
    this.statusService = statusService
    this.comentarioRepo = comentarioRepo
    this.formularioRepo = formularioRepo
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

  async details(id: number) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    if (!procedimento.tipo) {
      throw new NotFoundError('procedimento sem tipo relacionado')
    }

    const tipoProcedimento = await this.checkIfTipoProcedimentoExists(
      procedimento.tipo
    )

    const comentarios = await this.comentarioRepo.findAll({
      procedimentoId: procedimento.id
    })

    const formularios = await this.formularioRepo.findAll({
      id: tipoProcedimento.formularios
    })

    return {
      formularios,
      comentarios,
      procedimento,
      tipoProcedimento
    }
  }

  async findAll(query: ProcedimentoQuery, pagination: Pagination) {
    const procedimentos: ProcedimentoModel[] =
      await this.procedimentoRepo.findAll(query, pagination.term)

    const paginated = paginateList(procedimentos, pagination)

    return {
      total: procedimentos.length,
      data: paginated
    }
  }

  async findAllByStatus(status: TStatus, pagination: Pagination) {
    const procedimentos: ProcedimentoModel[] =
      await this.procedimentoRepo.findAllByStatus(status, pagination.term)

    const paginated = paginateList(procedimentos, pagination)

    return {
      total: procedimentos.length,
      data: paginated
    }
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

  private checkIfCanReceiveReviews(procedimento: ProcedimentoModel) {
    const currentStatus = getCurrentStatus(procedimento)

    if (currentStatus !== 'em_analise') {
      throw new BadRequestError(
        'Não é possível analisar esse procedimento neste status'
      )
    }
  }

  async newReview(id: number, actor: ActorModel, data: NewRevisao) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    this.checkIfCanReceiveReviews(procedimento)

    const revisao: Revisao = {
      ...data,
      data: new Date().toISOString(),
      autor: actor
    }

    await this.procedimentoRepo.newRevisao(id, revisao)

    return this.updateProcedimentoToNextStatus(procedimento, data)
  }
}
