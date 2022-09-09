import { PublicosUsuarioController } from 'controllers/usuario/publicos'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makePublicosUsuarioController = () => {
  return new PublicosUsuarioController(makeUsuarioRepository())
}
