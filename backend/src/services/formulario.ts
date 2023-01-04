import { ActorModel } from 'domain/models/actor'
import { FormularioModel } from 'domain/models/formulario'
import { Pagination } from 'repositories'
import {
  FormularioQuery,
  IFormularioRepository,
  NewFormulario
} from 'repositories/sequelize/formulario'
import { ITipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
import { Op } from 'sequelize'
import { IService } from 'services'
import { NotFoundError } from 'types/express/errors'
import { paginateList } from 'utils/value'

export interface IFormularioService
  extends IService<FormularioModel, FormularioQuery> {
  update: (
    id: number,
    data: Partial<FormularioModel>
  ) => Promise<FormularioModel>
  create: (actor: ActorModel, data: NewFormulario) => Promise<FormularioModel>
  findByTipo: (tipoId: number) => Promise<FormularioModel[]>
}

export class FormularioService implements IFormularioService {
  constructor(
    private repository: IFormularioRepository,
    private tipoProcedimentoRepo: ITipoProcedimentoRepository
  ) {}

  async create(actor: ActorModel, data: NewFormulario) {
    const newFormulario = await this.repository.create({
      campos: data.campos,
      nome: data.nome,
      descricao: data.descricao,
      createdBy: actor.id
    })

    return newFormulario
  }

  private async checkIfFormularioExists(id: number) {
    const formulario = await this.repository.findOne(id)

    if (!formulario) {
      throw new NotFoundError()
    }

    return formulario
  }

  async findOne(id: number) {
    const formulario = await this.checkIfFormularioExists(id)

    return formulario
  }

  async findAll(query: FormularioQuery, pagination: Pagination) {
    const formularios = await this.repository.findAll(query, pagination.term)

    const paginated = paginateList(formularios, pagination)

    return {
      total: formularios.length,
      data: paginated
    }
  }

  async findByTipo(tipoId: number) {
    const [tipoProcedimento] = await this.tipoProcedimentoRepo.findAll({
      id: tipoId
    })

    if (!tipoProcedimento) {
      throw new NotFoundError(`Tipo Procedimento ${tipoId} não encontrado`)
    }

    if (tipoProcedimento.formularios.length === 0) return []

    return this.repository.findAll({
      id: tipoProcedimento.formularios
    })
  }

  private async inactivateAllTiposWithForm(id: number) {
    const formularios = await this.tipoProcedimentoRepo.findAll({
      formularios: { [Op.contains]: [id] }
    })

    formularios.forEach(async tipoProcedimento => {
      await this.tipoProcedimentoRepo.update(tipoProcedimento.id, {
        status: 'inativo'
      })
    })
  }

  async delete(id: number) {
    await this.checkIfFormularioExists(id)

    await this.inactivateAllTiposWithForm(id)

    return this.repository.destroy(id)
  }

  async update(id: number, data: Partial<FormularioModel>) {
    await this.checkIfFormularioExists(id)

    return this.repository.update(id, data)
  }
}
