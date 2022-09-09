import { AuthTokenMiddleware } from 'middlewares/authorization'

export const makeAuthTokenMiddleware = () => {
  return new AuthTokenMiddleware()
}
