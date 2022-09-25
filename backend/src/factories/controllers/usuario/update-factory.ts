import { UpdateUsuarioController } from 'controllers/usuario/update'
import { makeUsuarioService } from 'factories/services/usuario-factory'

export const makeUpdateUsuarioController = () => {
  return new UpdateUsuarioController(makeUsuarioService())
}
