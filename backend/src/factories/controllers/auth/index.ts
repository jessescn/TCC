import { AuthController } from 'controllers/auth'
import { makeActorRepository } from 'factories/repositories/actor-factory'

export const makeAuthController = () => {
  return new AuthController(makeActorRepository())
}

export const authController = makeAuthController()
