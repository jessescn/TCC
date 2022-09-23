import { UpdateComentarioController } from 'controllers/comentario/update'
import { makeComentarioService } from 'factories/services/comentario-factory'

export const makeUpdateComentarioController = () => {
  return new UpdateComentarioController(makeComentarioService())
}
