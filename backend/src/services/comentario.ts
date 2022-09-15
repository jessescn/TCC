import {
  ComentarioQuery,
  ComentarioRepository
} from './../repository/sequelize/comentario'
import { UserModel } from 'models/user'
import { NotFoundError } from 'types/express/errors'
import { ComentarioModel } from 'models/comentario'
import { IRepository } from 'repository'

export type NewComentario = {
  conteudo: string
  procedimento: number
}
export class ComentarioService {
  private repository: ComentarioRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  async create(usuario: UserModel, data: NewComentario) {
    const newComentario = await this.repository.create({
      conteudo: data.conteudo,
      procedimentoId: data.procedimento,
      createdBy: usuario.id
    })

    return newComentario
  }

  async checkIfComentarioExists(id: number) {
    const comentario = await this.repository.findOne(id)

    if (!comentario) {
      throw new NotFoundError('comentario does not exists')
    }

    return comentario
  }

  async findOne(id: number) {
    const comentario = await this.checkIfComentarioExists(id)

    return comentario
  }

  async findAll(query: ComentarioQuery = {}) {
    return this.repository.findAll(query)
  }

  async delete(id: number) {
    await this.checkIfComentarioExists(id)

    return this.repository.destroy(id)
  }

  async update(id: number, data: Partial<ComentarioModel>) {
    await this.checkIfComentarioExists(id)

    return this.repository.update(id, data)
  }
}
