import { ActorModel } from 'domain/models/actor'
import { FormularioModel } from 'domain/models/formulario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { Pagination } from 'repositories'
import { IFormularioRepository } from 'repositories/sequelize/formulario'
import {
  ITipoProcedimentoRepository,
  NewTipoProcedimento,
  TipoProcedimentoQuery
} from 'repositories/sequelize/tipo-procedimento'
import { IService } from 'services'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { paginateList } from 'utils/value'

export type TipoProcedimentoDetails = {
  tipo: TipoProcedimentoModel
  formularios: FormularioModel[]
}

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
  constructor(
    private tipoProcedimentoRepo: ITipoProcedimentoRepository,
    private formularioRepo: IFormularioRepository
  ) {}

  private async checkIfFormulariosExists(ids: number[]) {
    if (ids.length === 0) return

    const formularios = await this.formularioRepo.findAll({ id: ids })

    if (formularios.length !== ids.length) {
      throw new BadRequestError()
    }

    return formularios
  }

  private async checkIfTipoProcedimentoExists(
    id: number,
    query: TipoProcedimentoQuery = { deleted: false }
  ) {
    const [tipoProcedimento] = await this.tipoProcedimentoRepo.findAll({
      id,
      ...query
    })

    if (!tipoProcedimento) {
      throw new NotFoundError(`Tipo Procedimento ${id} não encontrado.`)
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
      status: data.status || 'inativo',
      descricao: data.descricao,
      createdBy: actor.id
    })

    return newTipoProcedimento
  }

  async findOne(id: number) {
    return this.checkIfTipoProcedimentoExists(id)
  }

  async findAll(query: TipoProcedimentoQuery, pagination: Pagination) {
    const tipoProcedimentos = await this.tipoProcedimentoRepo.findAll(
      query,
      pagination.term
    )

    const paginated = paginateList(tipoProcedimentos, pagination)

    return {
      total: tipoProcedimentos.length,
      data: paginated
    }
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
