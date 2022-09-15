import { CreateComentarioController } from 'controllers/comentario/create'
import { makeComentarioService } from 'factories/services/comentario-factory'

export const makeCreateComentarioController = () => {
  return new CreateComentarioController(makeComentarioService())
}
