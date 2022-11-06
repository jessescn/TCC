import { ActorModel } from 'domain/models/actor'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { IRepository } from 'repositories'
import { FormularioRepository } from 'repositories/sequelize/formulario'
import {
  NewTipoProcedimento,
  TipoProcedimentoQuery,
  TipoProcedimentoRepository
} from 'repositories/sequelize/tipo-procedimento'
import { IService } from 'services'
import { BadRequestError, NotFoundError } from 'types/express/errors'

export interface ITipoProcedimentoService
  extends IService<TipoProcedimentoModel, TipoProcedimentoQuery> {
  create: (
    actor: ActorModel,
    data: NewTipoProcedimento
  ) => Promise<TipoProcedimentoModel>
  update: (
    id: number,
    data: Partial<TipoProcedimentoModel>
  ) => Promise<TipoProcedimentoModel>
}

export class TipoProcedimentoService implements ITipoProcedimentoService {
  private tipoProcedimentoRepo: TipoProcedimentoRepository
  private formularioRepo: FormularioRepository

  constructor(
    tipoProcedimentoRepo: IRepository,
    formularioRepo: FormularioRepository
  ) {
    this.tipoProcedimentoRepo = tipoProcedimentoRepo
    this.formularioRepo = formularioRepo
  }

  private async checkIfFormulariosExists(ids: number[]) {
    if (ids.length === 0) return

    const formularios = await this.formularioRepo.findAll({ id: 1 })

    if (formularios.length !== ids.length) {
      throw new BadRequestError()
    }
  }

  private async checkIfTipoProcedimentoExists(id: number) {
    const tipoProcedimento = await this.tipoProcedimentoRepo.findOne(id)

    if (!tipoProcedimento) {
      throw new NotFoundError()
    }

    return tipoProcedimento
  }

  async create(actor: ActorModel, data: NewTipoProcedimento) {
    await this.checkIfFormulariosExists(data.formularios)

    const newTipoProcedimento = await this.tipoProcedimentoRepo.create({
      colegiado: data.colegiado,
      escopo: data.escopo,
      formularios: data.formularios,
      nome: data.nome,
      publicos: data.publicos,
      dataFim: data.dataFim,
      dataInicio: data.dataInicio,
      descricao: data.descricao,
      createdBy: actor.id
    })

    return newTipoProcedimento
  }

  async findOne(id: number) {
    return this.checkIfTipoProcedimentoExists(id)
  }

  async findAll(query: TipoProcedimentoQuery = {}) {
    return this.tipoProcedimentoRepo.findAll(query)
  }

  async update(id: number, data: Partial<TipoProcedimentoModel>) {
    await this.checkIfTipoProcedimentoExists(id)

    return this.tipoProcedimentoRepo.update(id, data)
  }

  async delete(id: number) {
    await this.checkIfTipoProcedimentoExists(id)

    return this.tipoProcedimentoRepo.destroy(id)
  }
}
