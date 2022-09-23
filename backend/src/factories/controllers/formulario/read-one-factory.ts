import { ReadOneFormularioController } from 'controllers/formulario/read-one'
import { makeFormularioService } from 'factories/services/formulario-factory'

export const makeReadOneFormularioController = () => {
  return new ReadOneFormularioController(makeFormularioService())
}
