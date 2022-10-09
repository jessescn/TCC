import { ReadUsuarioController } from 'controllers/usuario/read'
import { makeActorService } from 'factories/services/actor-factory'

export const makeReadUsuarioController = () => {
  return new ReadUsuarioController(makeActorService())
}
