import { ReadUsuarioController } from 'controllers/usuario/read'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makeReadUsuarioController = () => {
  return new ReadUsuarioController(makeUsuarioRepository())
}
