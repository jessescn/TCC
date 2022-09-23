import { DeleteFormularioController } from 'controllers/formulario/delete'
import { makeFormularioService } from 'factories/services/formulario-factory'

export const makeDeleteFormularioController = () => {
  return new DeleteFormularioController(makeFormularioService())
}
