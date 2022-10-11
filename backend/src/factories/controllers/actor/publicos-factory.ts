import { PublicosController } from 'controllers/actor/publicos'
import { makeActorService } from 'factories/services/actor-factory'

export const makePublicosController = () => {
  return new PublicosController(makeActorService())
}
