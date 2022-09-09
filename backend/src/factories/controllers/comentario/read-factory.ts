import { ReadComentarioController } from 'controllers/comentario/read'
import { makeComentarioRepository } from 'factories/repositories/comentario-factory'

export const makeReadComentarioController = () => {
  return new ReadComentarioController(makeComentarioRepository())
}
