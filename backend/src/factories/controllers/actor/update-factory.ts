import { UpdateUsuarioController } from 'controllers/actor/update'
import { makeActorService } from 'factories/services/actor-factory'

export const makeUpdateUsuarioController = () => {
  return new UpdateUsuarioController(makeActorService())
}
