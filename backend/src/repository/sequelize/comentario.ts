import Comentario, {
  ComentarioAttributes,
  ComentarioModel
} from 'models/comentario'
import Procedimento from 'models/procedimento'
import { includeableUser, IRepository } from 'repository'
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
      include: [includeableUser, Procedimento],
      where: { deleted: false, ...query }
    })

    return comentarios
  }

  findOne = async (id: number) => {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [includeableUser, Procedimento]
    })

    return comentario
  }

  create = async (data: CreateComentario) => {
    const comentario = await Comentario.create(data, {
      include: [includeableUser, Procedimento]
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
