import { ReadOneProcedimentoController } from 'controllers/procedimento/read-one'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeReadOneProcedimentoController = () => {
  return new ReadOneProcedimentoController(makeProcedimentoRepository())
}
