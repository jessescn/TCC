import { CreateComentarioController } from 'controllers/comentario/create'
import { makeComentarioRepository } from 'factories/repositories/comentario-factory'

export const makeCreateComentarioController = () => {
  return new CreateComentarioController(makeComentarioRepository())
}
