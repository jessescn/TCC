import { CreateActorController } from 'controllers/actor/create'
import { makeActorService } from 'factories/services/actor-factory'

export const makeCreateActorController = () => {
  return new CreateActorController(makeActorService())
}
