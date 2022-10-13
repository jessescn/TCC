import { ActorModel } from 'domain/models/actor'
import { FormularioModel } from 'domain/models/formulario'
import { IRepository } from 'repositories'
import {
  FormularioQuery,
  FormularioRepository,
  NewFormulario
} from 'repositories/sequelize/formulario'
import { IService } from 'services'
import { NotFoundError } from 'types/express/errors'

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

  constructor(repository: IRepository) {
    this.repository = repository
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

  async findAll(query: FormularioQuery = {}) {
    return this.repository.findAll(query)
  }

  async delete(id: number) {
    await this.checkIfFormularioExists(id)

    return this.repository.destroy(id)
  }

  async update(id: number, data: Partial<FormularioModel>) {
    await this.checkIfFormularioExists(id)

    return this.repository.update(id, data)
  }
}
