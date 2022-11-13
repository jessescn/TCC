import { ReadActorProcedimentoController } from 'controllers/procedimento/read-actor'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeReadActorProcedimentoController = () => {
  return new ReadActorProcedimentoController(makeProcedimentoService())
}
