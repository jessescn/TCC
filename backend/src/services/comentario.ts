import { ComentarioQuery } from './../repository/sequelize/comentario'
import { NewComentario } from 'controllers/comentario/create'
import { makeComentarioRepository } from 'factories/repositories/comentario-factory'
import { UserModel } from 'models/user'
import { NotFoundError } from 'types/express/errors'
import { ComentarioModel } from 'models/comentario'

export class ComentarioService {
  static comentarioRepo = makeComentarioRepository()

  static async create(usuario: UserModel, data: NewComentario) {
    const newComentario = await this.comentarioRepo.create({
      conteudo: data.conteudo,
      procedimentoId: data.procedimento,
      createdBy: usuario.id
    })

    return newComentario
  }

  static async checkIfComentarioExists(id: number) {
    const comentario = await this.comentarioRepo.findOne(id)

    if (!comentario) {
      throw new NotFoundError('comentario does not exists')
    }

    return comentario
  }

  static async findOne(id: number) {
    const comentario = await this.checkIfComentarioExists(id)

    return comentario
  }

  static async findAll(query: ComentarioQuery = {}) {
    return this.comentarioRepo.findAll(query)
  }

  static async delete(id: number) {
    await this.checkIfComentarioExists(id)

    return this.comentarioRepo.destroy(id)
  }

  static async update(id: number, data: Partial<ComentarioModel>) {
    await this.checkIfComentarioExists(id)

    return this.comentarioRepo.update(id, data)
  }
}
