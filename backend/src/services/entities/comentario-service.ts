import Comentario, { ComentarioModel } from 'models/comentario'
import Procedimento from 'models/procedimento'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type CreateComentario = {
  conteudo: string
  procedimentoId: number
  createdBy: number
}

export type ComentarioQuery = WhereOptions<InferAttributes<ComentarioModel>>

export const ComentarioService = {
  getById: async function (id: number) {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [User, Procedimento]
    })

    if (!comentario) {
      throw new NotFoundError()
    }

    return comentario
  },
  getAll: async function (query: ComentarioQuery = {}) {
    const comentarios = await Comentario.findAll({
      include: [User, Procedimento],
      where: { deleted: false, ...query }
    })
    return comentarios
  },
  create: async function (data: CreateComentario) {
    const newComentario = await Comentario.create(data, {
      include: [User, Procedimento]
    })
    return newComentario
  },
  update: async function (id: number, data: any) {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [User, Procedimento]
    })

    if (!comentario) {
      throw new NotFoundError()
    }

    comentario.set({ ...data })

    await comentario.save()

    return comentario
  },
  destroy: async function (id: number) {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [User, Procedimento]
    })

    if (!comentario) {
      throw new NotFoundError()
    }

    comentario.set({ deleted: true })

    await comentario.save()

    return comentario
  }
}
