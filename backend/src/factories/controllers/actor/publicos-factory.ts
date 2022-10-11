import { PublicosUsuarioController } from 'controllers/actor/publicos'
import { makeActorService } from 'factories/services/actor-factory'

export const makePublicosUsuarioController = () => {
  return new PublicosUsuarioController(makeActorService())
}
