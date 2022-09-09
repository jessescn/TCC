import { ReadCommentsByProcedimentoController } from 'controllers/comentario/read-by-procedimento'
import { makeComentarioRepository } from 'factories/repositories/comentario-factory'

export const makeReadByProcedimentoController = () => {
  return new ReadCommentsByProcedimentoController(makeComentarioRepository())
}
