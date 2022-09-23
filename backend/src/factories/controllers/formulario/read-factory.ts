import { ReadFormularioController } from 'controllers/formulario/read'
import { makeFormularioService } from 'factories/services/formulario-factory'

export const makeReadFormularioController = () => {
  return new ReadFormularioController(makeFormularioService())
}
