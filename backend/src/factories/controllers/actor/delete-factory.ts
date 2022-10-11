import { DeleteUsuarioController } from 'controllers/actor/delete'
import { makeActorService } from 'factories/services/actor-factory'

export const makeDeleteUsuarioController = () => {
  return new DeleteUsuarioController(makeActorService())
}
