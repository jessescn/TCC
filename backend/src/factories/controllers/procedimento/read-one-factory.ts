import { ReadOneProcedimentoController } from 'controllers/procedimento/read-one'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeReadOneProcedimentoController = () => {
  return new ReadOneProcedimentoController(makeProcedimentoService())
}
