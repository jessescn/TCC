import { CreateFormularioController } from 'controllers/formulario/create'
import { makeFormularioService } from 'factories/services/formulario-factory'

export const makeCreateFormularioController = () => {
  return new CreateFormularioController(makeFormularioService())
}
