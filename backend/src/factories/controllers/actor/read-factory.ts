import { ReadUsuarioController } from 'controllers/actor/read'
import { makeActorService } from 'factories/services/actor-factory'

export const makeReadUsuarioController = () => {
  return new ReadUsuarioController(makeActorService())
}
