import { ReadOneTipoProcedimentoController } from 'controllers/tipo-procedimento/read-one'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeReadOneTipoProcedimentoController = () => {
  return new ReadOneTipoProcedimentoController(makeTipoProcedimentoService())
}
