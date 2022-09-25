import { CreateProcedimentoController } from 'controllers/procedimento/create'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeCreateProcedimentoController = () => {
  return new CreateProcedimentoController(makeProcedimentoService())
}
