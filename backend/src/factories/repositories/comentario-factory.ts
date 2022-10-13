import { ComentarioRepository } from 'repositories/sequelize/comentario'

export const makeComentarioRepository = () => {
  return new ComentarioRepository()
}
