import { CreateTipoProcedimentoController } from 'controllers/tipo-procedimento/create'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeCreateTipoProcedimentoController = () => {
  return new CreateTipoProcedimentoController(makeTipoProcedimentoService())
}
