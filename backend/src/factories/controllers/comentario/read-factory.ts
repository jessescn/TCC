import { ReadComentarioController } from 'controllers/comentario/read'
import { makeComentarioService } from 'factories/services/comentario-factory'

export const makeReadComentarioController = () => {
  return new ReadComentarioController(makeComentarioService())
}
