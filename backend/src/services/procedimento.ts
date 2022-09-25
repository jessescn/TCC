import {
  ProcedimentoAttributes,
  ProcedimentoModel,
  Revisao,
  TStatus
} from 'domain/models/procedimento'
import { UserModel } from 'domain/models/user'
import { ProcedimentoUseCase } from 'domain/usecases/procedimento'
import { TipoProcedimento } from 'domain/usecases/tipo-procedimento'
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
import { ProcedimentoStatusService } from './procedimento-status'

export interface IProcedimentoService
  extends IService<ProcedimentoAttributes, ProcedimentoQuery> {
  create: (
    usuario: UserModel,
    data: NewProcedimento
  ) => Promise<ProcedimentoAttributes>
  update: (
    id: number,
    data: Partial<ProcedimentoModel>
  ) => Promise<ProcedimentoAttributes>
  homologate: (id: number) => Promise<ProcedimentoAttributes>
  newReview: (
    id: number,
    usuario: UserModel,
    review: NewRevisao
  ) => Promise<ProcedimentoAttributes>
  updateStatus: (id: number, status: TStatus) => Promise<ProcedimentoAttributes>
}

export class ProcedimentoService implements IProcedimentoService {
  private procedimentoRepo: ProcedimentoRepository
  private tipoProcedimentoRepo: TipoProcedimentoRepository

  constructor(
    procedimentoRepo: IProcedimentoRepo,
    tipoProcedimentoRepo: IRepository
  ) {
    this.procedimentoRepo = procedimentoRepo
    this.tipoProcedimentoRepo = tipoProcedimentoRepo
  }

  private async checkIfTipoProcedimentoExists(tipo: number) {
    const tipoProcedimento = await this.tipoProcedimentoRepo.findOne(tipo)

    if (!tipoProcedimento) {
      throw new BadRequestError('tipo procedimento not found')
    }

    return tipoProcedimento
  }

  private async checkIfUserBelongsToPublico(usuario: UserModel, tipo: number) {
    const tipoProcedimento = await this.checkIfTipoProcedimentoExists(tipo)

    if (!TipoProcedimento.belongsToPublico(usuario, tipoProcedimento)) {
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
      ProcedimentoUseCase.getCurrentStatus(procedimento) ===
      'correcoes_pendentes'

    if (!isOnPendingChangesStatus) {
      throw new BadRequestError('Cannot update in this current status')
    }
  }

  private async updateCreatedProcedimentoStatus(
    createdProcedimento: ProcedimentoAttributes
  ) {
    const procedimento =
      await ProcedimentoStatusService.changeProcedimentoStatus(
        createdProcedimento,
        'em_analise'
      )

    return procedimento
  }

  async create(usuario: UserModel, data: NewProcedimento) {
    await this.checkIfUserBelongsToPublico(usuario, data.tipo)

    const created = await this.procedimentoRepo.create({
      respostas: data.respostas,
      tipo: data.tipo,
      createdBy: usuario.id,
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

  async updateStatus(id: number, status: TStatus) {
    await this.checkIfProcedimentoExists(id)

    return this.procedimentoRepo.updateStatus(id, status)
  }

  async update(id: number, data: Partial<ProcedimentoModel>) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    if (data.respostas) {
      this.checkIfProcedimentoCanUpdateResposta(procedimento)
    }

    await this.procedimentoRepo.update(id, data)

    return this.procedimentoRepo.updateStatus(id, 'em_analise')
  }

  async homologate(id: number) {
    return this.updateStatus(id, 'deferido')
  }

  private async updateProcedimentoToNextStatus(
    procedimento: ProcedimentoAttributes,
    data: NewRevisao
  ) {
    const hasPendingChanges = !data.aprovado

    if (hasPendingChanges) {
      return this.procedimentoRepo.updateStatus(
        procedimento.id,
        'correcoes_pendentes'
      )
    }

    const tipo = await this.tipoProcedimentoRepo.findOne(procedimento.tipo)

    const shouldForwardToColegiado = tipo.colegiado

    const nextStatus = shouldForwardToColegiado ? 'em_homologacao' : 'deferido'

    return this.procedimentoRepo.updateStatus(procedimento.id, nextStatus)
  }

  async newReview(id: number, usuario: UserModel, data: NewRevisao) {
    const procedimento = await this.checkIfProcedimentoExists(id)

    const revisao: Revisao = {
      ...data,
      data: new Date().toISOString(),
      autor: usuario
    }

    await this.procedimentoRepo.newRevisao(id, revisao)

    return this.updateProcedimentoToNextStatus(procedimento, data)
  }
}
