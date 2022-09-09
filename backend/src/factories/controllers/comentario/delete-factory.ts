import { DeleteComentarioController } from 'controllers/comentario/delete'
import { makeComentarioRepository } from 'factories/repositories/comentario-factory'

export const makeDeleteComentarioController = () => {
  return new DeleteComentarioController(makeComentarioRepository())
}
