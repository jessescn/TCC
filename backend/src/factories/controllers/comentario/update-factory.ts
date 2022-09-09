import { UpdateComentarioController } from 'controllers/comentario/update'
import { makeComentarioRepository } from 'factories/repositories/comentario-factory'

export const makeUpdateComentarioController = () => {
  return new UpdateComentarioController(makeComentarioRepository())
}
