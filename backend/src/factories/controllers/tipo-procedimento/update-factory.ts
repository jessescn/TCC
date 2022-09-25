import { UpdateTipoProcedimentoController } from 'controllers/tipo-procedimento/update'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeUpdateTipoProcedimentoController = () => {
  return new UpdateTipoProcedimentoController(makeTipoProcedimentoService())
}
