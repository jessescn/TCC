import { makeComentarioRepository } from 'factories/repositories/comentario-factory'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { ComentarioService } from 'services/comentario'

export const makeComentarioService = () => {
  return new ComentarioService(
    makeComentarioRepository(),
    makeProcedimentoRepository()
  )
}
