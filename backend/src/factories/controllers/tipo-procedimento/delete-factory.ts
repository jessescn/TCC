import { DeleteTipoProcedimentoController } from 'controllers/tipo-procedimento/delete'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeDeleteTipoProcedimentoController = () => {
  return new DeleteTipoProcedimentoController(makeTipoProcedimentoService())
}
