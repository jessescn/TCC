import { ReadFormularioController } from 'controllers/formulario/read'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'

export const makeReadFormularioController = () => {
  return new ReadFormularioController(makeFormularioRepository())
}
