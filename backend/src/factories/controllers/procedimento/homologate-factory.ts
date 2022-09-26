import { HomologateProcedimentoController } from 'controllers/procedimento/homologate'
import { makeColegiadoService } from 'factories/services/colegiado-factory'

export const makeHomologateProcedimentoController = () => {
  return new HomologateProcedimentoController(makeColegiadoService())
}
