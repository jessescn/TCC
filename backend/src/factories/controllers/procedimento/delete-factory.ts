import { DeleteProcedimentoController } from 'controllers/procedimento/delete'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeDeleteProcedimentoController = () => {
  return new DeleteProcedimentoController(makeProcedimentoService())
}
