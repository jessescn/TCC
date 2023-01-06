import Actor from 'domain/models/actor'
import Comentario, {
  ComentarioAttributes,
  ComentarioModel
} from 'domain/models/comentario'
import Profile from 'domain/models/profile'
import { IRepository } from 'repositories'
import { InferAttributes, WhereOptions } from 'sequelize/types'

export type ComentarioQuery = WhereOptions<
  InferAttributes<ComentarioAttributes>
>

export type NewComentario = {
  conteudo: string
  procedimento: number
}

export type CreateComentario = {
  conteudo: string
  procedimentoId: number
  createdBy: number
}

export interface IComentarioRepository extends IRepository {
  findOne: (id: number) => Promise<ComentarioModel>
  findAll: (
    query: ComentarioQuery,
    term?: string | null
  ) => Promise<ComentarioModel[]>
  create: (data: CreateComentario) => Promise<ComentarioModel>
  update: (
    id: number,
    data: Partial<ComentarioModel>
  ) => Promise<ComentarioModel>
  destroy: (id: number) => Promise<ComentarioModel>
}

export class ComentarioRepository implements IComentarioRepository {
  findAll = async (query: ComentarioQuery = {}) => {
    const comentarios = await Comentario.findAll({
      include: [
        {
          model: Actor,
          attributes: ['nome', 'email'],
          include: [Profile]
        }
      ],
      where: { deleted: false, ...query },
      order: [['createdAt', 'ASC']]
    })

    return comentarios
  }

  findOne = async (id: number) => {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [
        {
          model: Actor,
          attributes: ['nome', 'email'],
          include: [Profile]
        }
      ]
    })

    return comentario
  }

  create = async (data: CreateComentario) => {
    const comentario = await Comentario.create(data, {
      include: [
        {
          model: Actor,
          attributes: ['nome', 'email'],
          include: [Profile]
        }
      ]
    })

    return comentario
  }

  update = async (id: number, data: Partial<ComentarioModel>) => {
    const comentario = await this.findOne(id)

    comentario.set({ ...data })

    await comentario.save()

    return comentario
  }

  destroy = async (id: number) => {
    const comentario = await this.findOne(id)

    comentario.set({ deleted: true })

    await comentario.save()

    return comentario
  }
}
