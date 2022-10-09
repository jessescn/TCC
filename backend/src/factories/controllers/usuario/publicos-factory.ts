import { PublicosUsuarioController } from 'controllers/usuario/publicos'
import { makeActorService } from 'factories/services/actor-factory'

export const makePublicosUsuarioController = () => {
  return new PublicosUsuarioController(makeActorService())
}
