import { ReadCommentsByProcedimentoController } from 'controllers/comentario/read-by-procedimento'
import { makeComentarioService } from 'factories/services/comentario-factory'

export const makeReadByProcedimentoController = () => {
  return new ReadCommentsByProcedimentoController(makeComentarioService())
}
