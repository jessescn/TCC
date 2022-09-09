import { ReadTipoProcedimentoController } from 'controllers/tipo-procedimento/read'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'

export const makeReadTipoProcedimentoController = () => {
  return new ReadTipoProcedimentoController(makeTipoProcedimentoRepository())
}
