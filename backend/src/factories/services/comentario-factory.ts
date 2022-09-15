import { makeComentarioRepository } from 'factories/repositories/comentario-factory'
import { ComentarioService } from 'services/comentario'

export const makeComentarioService = () => {
  return new ComentarioService(makeComentarioRepository())
}
