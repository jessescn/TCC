import { makeActorService } from 'factories/services/actor-factory'
import { AuthTokenMiddleware } from 'middlewares/authorization'

export const makeAuthTokenMiddleware = () => {
  return new AuthTokenMiddleware(makeActorService())
}
