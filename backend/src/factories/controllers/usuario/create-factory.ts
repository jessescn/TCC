import { CreateActorController } from 'controllers/usuario/create'
import { makeActorService } from 'factories/services/actor-factory'

export const makeCreateUsuarioController = () => {
  return new CreateActorController(makeActorService())
}
