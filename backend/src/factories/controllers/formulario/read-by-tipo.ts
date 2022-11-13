import { ReadFormulariosByTipoController } from 'controllers/formulario/read-by-tipo'
import { makeFormularioService } from 'factories/services/formulario-factory'

export const makeReadFormulariosByTipoController = () => {
  return new ReadFormulariosByTipoController(makeFormularioService())
}
