import { GetDetailsProcedimentoController } from 'controllers/procedimento/details'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeGetDetailsProcedimentoController = () => {
  return new GetDetailsProcedimentoController(makeProcedimentoService())
}
