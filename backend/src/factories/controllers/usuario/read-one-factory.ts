import { ReadOneUsuarioController } from 'controllers/usuario/read-one'
import { makeUsuarioService } from 'factories/services/usuario-factory'

export const makeReadOneUsuarioController = () => {
  return new ReadOneUsuarioController(makeUsuarioService())
}
