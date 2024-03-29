import { makeFormularioRepository } from 'factories/repositories/formulario-factory'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'
import { TipoProcedimentoService } from 'services/tipo-procedimento'

export const makeTipoProcedimentoService = () => {
  return new TipoProcedimentoService(
    makeTipoProcedimentoRepository(),
    makeFormularioRepository(),
    makeProcedimentoRepository()
  )
}
