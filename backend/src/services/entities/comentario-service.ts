import Comentario, { ComentarioModel } from 'models/comentario'
import User from 'models/user'
import { InferAttributes, WhereOptions } from 'sequelize/types'
import { NotFoundError } from 'types/express/errors'

export type CreateComentario = {
  conteudo: string
  processoId: number
  createdBy: number
}

export type ComentarioQuery = WhereOptions<InferAttributes<ComentarioModel>>

export const ComentarioService = {
  getById: async function (id: number) {
    const resource = await Comentario.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    return resource
  },
  getAll: async function (query: ComentarioQuery = {}) {
    const resources = await Comentario.findAll({
      include: [User],
      where: { deleted: false, ...query }
    })
    return resources
  },
  create: async function (data: CreateComentario) {
    const newResource = await Comentario.create(data)
    return newResource
  },
  update: async function (id: number, data: any) {
    const resource = await Comentario.findOne({ where: { id, deleted: false } })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ ...data })

    await resource.save()

    return resource
  },
  destroy: async function (id: number) {
    const resource = await Comentario.findOne({
      where: { id, deleted: false }
    })

    if (!resource) {
      throw new NotFoundError()
    }

    resource.set({ deleted: true })

    await resource.save()

    return resource
  }
}
