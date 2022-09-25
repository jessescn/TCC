import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'
import { UsuarioService } from 'services/usuario'

export const makeUsuarioService = () => {
  return new UsuarioService(makeUsuarioRepository())
}
