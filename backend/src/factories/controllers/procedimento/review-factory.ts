import { ReviewProcedimentoController } from 'controllers/procedimento/review'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeReviewProcedimentoController = () => {
  return new ReviewProcedimentoController(makeProcedimentoService())
}
