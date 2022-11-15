import { makeComentarioRepository } from 'factories/repositories/comentario-factory'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'
import { ProcedimentoService } from 'services/procedimento'
import { makeProcedimentoStatusService } from './procedimento-status-factory'

export const makeProcedimentoService = () => {
  return new ProcedimentoService(
    makeProcedimentoRepository(),
    makeTipoProcedimentoRepository(),
    makeComentarioRepository(),
    makeFormularioRepository(),
    makeProcedimentoStatusService()
  )
}
