import { ReadOneTipoProcedimentoController } from 'controllers/tipo-procedimento/read-one'
import { makeTipoProcedimentoRepository } from 'factories/repositories/tipo-procedimento-factory'

export const makeReadOneTipoProcedimentoController = () => {
  return new ReadOneTipoProcedimentoController(makeTipoProcedimentoRepository())
}
