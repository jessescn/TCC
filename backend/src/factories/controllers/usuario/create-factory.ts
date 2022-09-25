import { CreateUsuarioController } from 'controllers/usuario/create'
import { makeUsuarioService } from 'factories/services/usuario-factory'

export const makeCreateUsuarioController = () => {
  return new CreateUsuarioController(makeUsuarioService())
}
