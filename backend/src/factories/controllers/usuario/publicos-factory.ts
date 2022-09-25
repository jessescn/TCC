import { PublicosUsuarioController } from 'controllers/usuario/publicos'
import { makeUsuarioService } from 'factories/services/usuario-factory'

export const makePublicosUsuarioController = () => {
  return new PublicosUsuarioController(makeUsuarioService())
}
