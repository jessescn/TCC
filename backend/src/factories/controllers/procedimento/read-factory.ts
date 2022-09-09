import { ReadProcedimentoController } from 'controllers/procedimento/read'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeReadProcedimentoController = () => {
  return new ReadProcedimentoController(makeProcedimentoRepository())
}
