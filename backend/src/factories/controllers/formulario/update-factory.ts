import { UpdateFormularioController } from 'controllers/formulario/update'
import { makeFormularioService } from 'factories/services/formulario-factory'

export const makeUpdateFormularioController = () => {
  return new UpdateFormularioController(makeFormularioService())
}
