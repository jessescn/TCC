import { ReadOneUsuarioController } from 'controllers/usuario/read-one'
import { makeActorService } from 'factories/services/actor-factory'

export const makeReadOneUsuarioController = () => {
  return new ReadOneUsuarioController(makeActorService())
}
