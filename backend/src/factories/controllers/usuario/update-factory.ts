import { UpdateUsuarioController } from 'controllers/usuario/update'
import { makeActorService } from 'factories/services/actor-factory'

export const makeUpdateUsuarioController = () => {
  return new UpdateUsuarioController(makeActorService())
}
