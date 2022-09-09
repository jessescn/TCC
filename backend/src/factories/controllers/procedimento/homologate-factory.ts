import { HomologateProcedimentoController } from 'controllers/procedimento/homologate'
import { makeProcedimentoRepository } from 'factories/repositories/procedimento-factory'

export const makeHomologateProcedimentoController = () => {
  return new HomologateProcedimentoController(makeProcedimentoRepository())
}
