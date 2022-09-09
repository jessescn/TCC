import { DeleteProcedimentoController } from 'controllers/procedimento/delete'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeDeleteProcedimentoController = () => {
  return new DeleteProcedimentoController(makeProcedimentoRepository())
}
