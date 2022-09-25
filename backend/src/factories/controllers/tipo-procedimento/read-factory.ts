import { ReadTipoProcedimentoController } from 'controllers/tipo-procedimento/read'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeReadTipoProcedimentoController = () => {
  return new ReadTipoProcedimentoController(makeTipoProcedimentoService())
}
