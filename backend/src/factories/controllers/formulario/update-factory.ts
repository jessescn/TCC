import { UpdateFormularioController } from 'controllers/formulario/update'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'

export const makeUpdateFormularioController = () => {
  return new UpdateFormularioController(makeFormularioRepository())
}
