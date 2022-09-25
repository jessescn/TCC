import { HomologateProcedimentoController } from 'controllers/procedimento/homologate'
import { makeProcedimentoService } from 'factories/services/procedimento-factory'

export const makeHomologateProcedimentoController = () => {
  return new HomologateProcedimentoController(makeProcedimentoService())
}
