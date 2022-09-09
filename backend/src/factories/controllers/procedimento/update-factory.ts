import { UpdateProcedimentoController } from 'controllers/procedimento/update'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeUpdateProcedimentoController = () => {
  return new UpdateProcedimentoController(makeProcedimentoRepository())
}
