import {
  TipoProcedimentoAttributes,
  TipoProcedimentoModel
} from 'models/tipo-procedimento'
import { UserModel } from 'models/user'
import { IRepository } from 'repository'
import { FormularioRepository } from 'repository/sequelize/formulario'
import {
  NewTipoProcedimento,
  TipoProcedimentoRepository,
  TipoProcedimentoQuery
} from 'repository/sequelize/tipo-procedimento'
import { IService } from 'services'
import { BadRequestError, NotFoundError } from 'types/express/errors'

export interface ITipoProcedimentoService
  extends IService<TipoProcedimentoAttributes, TipoProcedimentoQuery> {
  create: (
    usuario: UserModel,
    data: NewTipoProcedimento
  ) => Promise<TipoProcedimentoAttributes>
  update: (
    id: number,
    data: Partial<TipoProcedimentoModel>
  ) => Promise<TipoProcedimentoAttributes>
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

    const formularios = await this.formularioRepo.findAll({ id: { in: ids } })

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

  async create(usuario: UserModel, data: NewTipoProcedimento) {
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
      createdBy: usuario.id
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
