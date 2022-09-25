import { UpdateProcedimentoController } from 'controllers/procedimento/update'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeUpdateProcedimentoController = () => {
  return new UpdateProcedimentoController(makeProcedimentoService())
}
