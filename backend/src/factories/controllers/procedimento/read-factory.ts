import { ReadProcedimentoController } from 'controllers/procedimento/read'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeReadProcedimentoController = () => {
  return new ReadProcedimentoController(makeProcedimentoService())
}
