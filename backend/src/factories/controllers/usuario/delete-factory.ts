import { DeleteUsuarioController } from 'controllers/usuario/delete'
import { makeActorService } from 'factories/services/actor-factory'

export const makeDeleteUsuarioController = () => {
  return new DeleteUsuarioController(makeActorService())
}
