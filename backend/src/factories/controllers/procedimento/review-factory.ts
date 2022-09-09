import { ReviewProcedimentoController } from 'controllers/procedimento/review'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'

export const makeReviewProcedimentoController = () => {
  return new ReviewProcedimentoController(
    makeProcedimentoRepository(),
    makeTipoProcedimentoRepository()
  )
}
