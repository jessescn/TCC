import { ReadActorController } from 'controllers/actor/read'
import { makeActorService } from 'factories/services/actor-factory'

export const makeReadActorController = () => {
  return new ReadActorController(makeActorService())
}
