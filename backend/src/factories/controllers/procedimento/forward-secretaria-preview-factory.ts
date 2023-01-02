import { ForwardToSecretariaPreviewController } from 'controllers/procedimento/forward-secretaria-preview'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeForwardToSecretariaPreviewController = () => {
  return new ForwardToSecretariaPreviewController(makeProcedimentoService())
}
