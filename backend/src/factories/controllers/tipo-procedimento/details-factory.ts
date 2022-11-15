import { GetDetailsTipoProcedimentoController } from 'controllers/tipo-procedimento/details'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeGetDetailsTipoProcedimentoController = () => {
  return new GetDetailsTipoProcedimentoController(makeTipoProcedimentoService())
}
