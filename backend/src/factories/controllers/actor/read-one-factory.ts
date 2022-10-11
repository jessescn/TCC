import { ReadOneActorController } from 'controllers/actor/read-one'
import { makeActorService } from 'factories/services/actor-factory'

export const makeReadOneActorController = () => {
  return new ReadOneActorController(makeActorService())
}
