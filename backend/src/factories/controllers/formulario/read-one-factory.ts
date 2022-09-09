import { ReadOneFormularioController } from 'controllers/formulario/read-one'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'

export const makeReadOneFormularioController = () => {
  return new ReadOneFormularioController(makeFormularioRepository())
}
