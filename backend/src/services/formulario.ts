import { FormularioModel, NewFormulario } from 'models/formulario'
import { UserModel } from 'models/user'
import { IRepository } from 'repository'
import {
  FormularioQuery,
  FormularioRepository
} from 'repository/sequelize/formulario'
import { NotFoundError } from 'types/express/errors'

export class FormularioService {
  private repository: FormularioRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  async create(usuario: UserModel, data: NewFormulario) {
    const newFormulario = await this.repository.create({
      campos: data.campos,
      nome: data.nome,
      descricao: data.descricao,
      createdBy: usuario.id
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
