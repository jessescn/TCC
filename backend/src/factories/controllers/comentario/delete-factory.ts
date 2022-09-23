import { DeleteComentarioController } from 'controllers/comentario/delete'
import { makeComentarioService } from 'factories/services/comentario-factory'

export const makeDeleteComentarioController = () => {
  return new DeleteComentarioController(makeComentarioService())
}
