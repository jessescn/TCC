import { DeleteActorController } from 'controllers/actor/delete'
import { makeActorService } from 'factories/services/actor-factory'

export const makeDeleteActorController = () => {
  return new DeleteActorController(makeActorService())
}
