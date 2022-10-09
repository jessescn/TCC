import {
  ComentarioQuery,
  ComentarioRepository,
  NewComentario
} from './../repository/sequelize/comentario'
import { ActorModel } from 'domain/models/actor'
import { NotFoundError } from 'types/express/errors'
import { ComentarioModel } from 'domain/models/comentario'
import { IRepository } from 'repository'
import { IService } from 'services'

export interface IComentarioService
  extends IService<ComentarioModel, ComentarioQuery> {
  update: (
    id: number,
    data: Partial<ComentarioModel>
  ) => Promise<ComentarioModel>
  create: (actor: ActorModel, data: NewComentario) => Promise<ComentarioModel>
}

export class ComentarioService implements IComentarioService {
  private repository: ComentarioRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  async create(actor: ActorModel, data: NewComentario) {
    const newComentario = await this.repository.create({
      conteudo: data.conteudo,
      procedimentoId: data.procedimento,
      createdBy: actor.id
    })

    return newComentario
  }

  private async checkIfComentarioExists(id: number) {
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
