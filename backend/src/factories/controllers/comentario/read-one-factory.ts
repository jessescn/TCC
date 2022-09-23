import { ReadOneComentarioController } from 'controllers/comentario/read-one'
import { makeComentarioService } from 'factories/services/comentario-factory'

export const makeReadOneComentarioController = () => {
  return new ReadOneComentarioController(makeComentarioService())
}
