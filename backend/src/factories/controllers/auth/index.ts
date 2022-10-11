import { AuthController } from 'controllers/auth'
import { makeActorService } from 'factories/services/actor-factory'

export const makeAuthController = () => {
  return new AuthController(makeActorService())
}

export const authController = makeAuthController()
