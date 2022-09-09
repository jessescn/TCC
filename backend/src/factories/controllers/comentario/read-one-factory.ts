import { ReadOneComentarioController } from 'controllers/comentario/read-one'
import { makeComentarioRepository } from 'factories/repositories/comentario-factory'

export const makeReadOneComentarioController = () => {
  return new ReadOneComentarioController(makeComentarioRepository())
}
