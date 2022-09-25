import { ReadUsuarioController } from 'controllers/usuario/read'
import { makeUsuarioService } from 'factories/services/usuario-factory'

export const makeReadUsuarioController = () => {
  return new ReadUsuarioController(makeUsuarioService())
}
