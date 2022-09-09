import { DeleteTipoProcedimentoController } from 'controllers/tipo-procedimento/delete'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'

export const makeDeleteTipoProcedimentoController = () => {
  return new DeleteTipoProcedimentoController(makeTipoProcedimentoRepository())
}
