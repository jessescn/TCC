import { ReadOneUsuarioController } from 'controllers/usuario/read-one'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makeReadOneUsuarioController = () => {
  return new ReadOneUsuarioController(makeUsuarioRepository())
}
