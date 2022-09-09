import { CreateUsuarioController } from 'controllers/usuario/create'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makeCreateUsuarioController = () => {
  return new CreateUsuarioController(makeUsuarioRepository())
}
