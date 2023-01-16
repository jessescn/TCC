import { AnalyzableDataController } from 'controllers/tipo-procedimento/analyzable-data'
import { makeTipoProcedimentoService } from 'factories/services/tipo-procedimento-factory'

export const makeAnalyzableDataController = () => {
  return new AnalyzableDataController(makeTipoProcedimentoService())
}
