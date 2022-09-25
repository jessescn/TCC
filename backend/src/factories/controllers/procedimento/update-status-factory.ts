import { UpdateStatusProcedimentoController } from 'controllers/procedimento/update-status'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeUpdateStatusProcedimentoController = () => {
  return new UpdateStatusProcedimentoController(makeProcedimentoService())
}
