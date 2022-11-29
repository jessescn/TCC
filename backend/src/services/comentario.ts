import {
  ComentarioQuery,
  ComentarioRepository,
  NewComentario
} from '../repositories/sequelize/comentario'
import { ActorModel } from 'domain/models/actor'
import { NotFoundError } from 'types/express/errors'
import { ComentarioModel } from 'domain/models/comentario'
import { IProcedimentoRepo, IRepository } from 'repositories'
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
  private procedimentoRepo: IProcedimentoRepo

  constructor(repository: IRepository, procedimentoRepo: IProcedimentoRepo) {
    this.repository = repository
    this.procedimentoRepo = procedimentoRepo
  }

  private async checkIfProcedimentoExists(procedimentoId: number) {
    const procedimento = await this.procedimentoRepo.findOne(procedimentoId)

    if (!procedimento) {
      throw new NotFoundError('procedimento does not exists')
    }
  }

  async create(actor: ActorModel, data: NewComentario) {
    await this.checkIfProcedimentoExists(data.procedimento)

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
