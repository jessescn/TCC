import { ActorModel } from 'domain/models/actor'
import { FormularioModel } from 'domain/models/formulario'
import { IRepository, Pagination } from 'repositories'
import {
  FormularioQuery,
  FormularioRepository,
  NewFormulario
} from 'repositories/sequelize/formulario'
import { TipoProcedimentoRepository } from 'repositories/sequelize/tipo-procedimento'
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
}

export class FormularioService implements IFormularioService {
  private repository: FormularioRepository
  private tipoProcedimentoRepo: TipoProcedimentoRepository

  constructor(repository: IRepository, tipoProcedimentoRepo: IRepository) {
    this.repository = repository
    this.tipoProcedimentoRepo = tipoProcedimentoRepo
  }

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

  async findAll(query: FormularioQuery = {}, pagination: Pagination) {
    const formularios = await this.repository.findAll(query, pagination)

    const paginated = paginateList(formularios, pagination)

    return {
      total: formularios.length,
      data: paginated
    }
  }

  private async inactivateAllTiposWithForm(id: number) {
    const formularios = await this.tipoProcedimentoRepo.findAll(
      {
        formularios: { [Op.contains]: [id] }
      },
      { page: 1, per_page: 1000, term: null }
    )

    formularios.forEach(async tipoProcedimento => {
      tipoProcedimento.set({ status: 'inativo' })

      await tipoProcedimento.save()
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
