import { UpdateActorController } from 'controllers/actor/update'
import { makeActorService } from 'factories/services/actor-factory'

export const makeUpdateActorController = () => {
  return new UpdateActorController(makeActorService())
}
