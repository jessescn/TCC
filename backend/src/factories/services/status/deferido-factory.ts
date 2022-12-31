import { makeFormularioRepository } from 'factories/repositories/formulario-factory'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'
import { DeferidoStatusHandler } from 'services/status/deferido'

export const makeDeferidoStatusHandler = () => {
  return new DeferidoStatusHandler(
    makeTipoProcedimentoRepository(),
    makeFormularioRepository()
  )
}
