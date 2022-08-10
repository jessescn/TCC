import Comentario, { ComentarioModel } from 'models/comentario'
import Procedimento from 'models/procedimento'
import User from 'models/user'
import { Includeable, InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type CreateComentario = {
  conteudo: string
  procedimentoId: number
  createdBy: number
}

const includeableUser: Includeable = {
  model: User,
  as: 'user',
  required: false,
  attributes: ['nome', 'email']
}

export type ComentarioQuery = WhereOptions<InferAttributes<ComentarioModel>>

export const ComentarioService = {
  getById: async function (id: number) {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [includeableUser, Procedimento]
    })

    if (!comentario) {
      throw new NotFoundError()
    }

    return comentario
  },
  getAll: async function (query: ComentarioQuery = {}) {
    const comentarios = await Comentario.findAll({
      include: [includeableUser, Procedimento],
      where: { deleted: false, ...query }
    })
    return comentarios
  },
  create: async function (data: CreateComentario) {
    const { id } = await Comentario.create(data)

    const resource = await Comentario.findOne({
      where: { id },
      include: [includeableUser, Procedimento]
    })

    return resource
  },
  update: async function (id: number, data: any) {
    const comentario = await Comentario.findOne({
      where: { id, deleted: false },
      include: [includeableUser, Procedimento]
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
      include: [includeableUser, Procedimento]
    })

    if (!comentario) {
      throw new NotFoundError()
    }

    comentario.set({ deleted: true })

    await comentario.save()

    return comentario
  }
}
