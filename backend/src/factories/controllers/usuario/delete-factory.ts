import { DeleteUsuarioController } from 'controllers/usuario/delete'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makeDeleteUsuarioController = () => {
  return new DeleteUsuarioController(makeUsuarioRepository())
}
