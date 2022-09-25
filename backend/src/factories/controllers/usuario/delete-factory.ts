import { DeleteUsuarioController } from 'controllers/usuario/delete'
import { makeUsuarioService } from 'factories/services/usuario-factory'

export const makeDeleteUsuarioController = () => {
  return new DeleteUsuarioController(makeUsuarioService())
}
