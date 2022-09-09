import { UpdateTipoProcedimentoController } from 'controllers/tipo-procedimento/update'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'

export const makeUpdateTipoProcedimentoController = () => {
  return new UpdateTipoProcedimentoController(makeTipoProcedimentoRepository())
}
