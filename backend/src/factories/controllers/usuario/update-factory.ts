import { UpdateUsuarioController } from 'controllers/usuario/update'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makeUpdateUsuarioController = () => {
  return new UpdateUsuarioController(makeUsuarioRepository())
}
