import { DeleteFormularioController } from 'controllers/formulario/delete'
import { makeFormularioRepository } from 'factories/repositories/formulario-factory'

export const makeDeleteFormularioController = () => {
  return new DeleteFormularioController(makeFormularioRepository())
}
