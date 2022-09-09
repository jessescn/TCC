import { UpdateStatusProcedimentoController } from 'controllers/procedimento/update-status'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeUpdateStatusProcedimentoController = () => {
  return new UpdateStatusProcedimentoController(makeProcedimentoRepository())
}
