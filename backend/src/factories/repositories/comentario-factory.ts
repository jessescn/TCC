import { ComentarioRepository } from 'repository/sequelize/comentario'

export const makeComentarioRepository = () => {
  return new ComentarioRepository()
}
