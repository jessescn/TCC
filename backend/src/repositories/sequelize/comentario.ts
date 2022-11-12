import Actor from 'domain/models/actor'
import Comentario, {
  ComentarioAttributes,
  ComentarioModel
} from 'domain/models/comentario'
import Procedimento from 'domain/models/procedimento'
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

export class ComentarioRepository implements IRepository {
  findAll = async (query: ComentarioQuery = {}) => {
    const comentarios = await Comentario.findAll({
      include: [
        Procedimento,
        {
          model: Actor,
          attributes: ['nome', 'email']
        }
      ],
      where: { deleted: false, ...query }
    })

    return comentarios
  }

  findOne = async (id: number) => {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [Procedimento]
    })

    return comentario
  }

  create = async (data: CreateComentario) => {
    const comentario = await Comentario.create(data, {
      include: [
        Procedimento,
        {
          model: Actor,
          attributes: ['nome', 'email']
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
