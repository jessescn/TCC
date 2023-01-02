import { ForwardToSecretariaController } from 'controllers/procedimento/forward-secretaria'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeForwardToSecretariaController = () => {
  return new ForwardToSecretariaController(makeProcedimentoService())
}
