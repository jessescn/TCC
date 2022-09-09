import { CreateFormularioController } from 'controllers/formulario/create'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'

export const makeCreateFormularioController = () => {
  return new CreateFormularioController(makeFormularioRepository())
}
