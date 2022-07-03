import Comentario from 'models/comentario'
import User from 'models/user'
import { NotFoundError } from 'types/express/errors'

export type CreateComentario = {
  conteudo: string
  processoId: number
  userId: number
  comentarioMae?: number
}

export const ComentarioService = {
  getById: async function (id: number) {
    const comentario = await Comentario.findByPk(id)

    if (!comentario || comentario.deleted) {
      throw new NotFoundError()
    }

    return comentario
  },
  getAll: async function () {
    const comentarios = await Comentario.findAll({
      include: [User, Comentario],
      where: { deleted: false }
    })
    return comentarios
  },
  create: async function (data: CreateComentario) {
    const newComentario = await Comentario.create(data)
    return newComentario
  },
  update: async function (id: number, data: any) {
    const comentario = await Comentario.findByPk(id)

    if (!comentario || comentario.deleted) {
      throw new NotFoundError()
    }

    comentario.set({ ...data })

    await comentario.save()

    return comentario
  },
  destroy: async function (id: number) {
    const comentario = await Comentario.findByPk(id)

    if (!comentario || comentario.deleted) {
      throw new NotFoundError()
    }

    comentario.set({ deleted: true })

    await comentario.save()

    return comentario
  }
}
