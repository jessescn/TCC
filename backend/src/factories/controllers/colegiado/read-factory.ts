import { ReadEmHomologacaoController } from 'controllers/colegiado/read'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeReadEmHomologacaoController = () => {
  return new ReadEmHomologacaoController(makeProcedimentoService())
}
