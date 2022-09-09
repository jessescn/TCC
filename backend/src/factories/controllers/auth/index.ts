import { AuthController } from 'controllers/auth'
import { makeUsuarioRepository } from 'factories/repositories/usuario-factory'

export const makeAuthController = () => {
  return new AuthController(makeUsuarioRepository())
}

export const authController = makeAuthController()
