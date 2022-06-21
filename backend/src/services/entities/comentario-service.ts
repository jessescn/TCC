import Comentario, { ComentarioModel } from 'models/comentario'
import Processo from 'models/processo'
import User from 'models/user'
import { NotFoundError } from 'types/express/errors'
import { BaseService } from './base-service'

export type CreateComentario = {
  conteudo: string
  processoId: number
  comentarioMae?: number
}

export const ComentarioService: BaseService<ComentarioModel> = {
  getById: async function (id: number) {
    const comentario = await Comentario.findByPk(id)

    if (!comentario || comentario.deleted) {
      throw new NotFoundError()
    }

    return comentario
  },
  getAll: async function () {
    const comentarios = await Comentario.findAll({
      include: [User, Comentario, Processo],
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
