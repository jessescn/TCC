import { AuthTokenMiddleware } from 'middlewares/authorization'
import { makeAuthTokenMiddleware } from '../authorization-factory'

describe('Authorization Middleware Factory', () => {
  it('should create a instance of AuthTokenMiddleware class', () => {
    const result = makeAuthTokenMiddleware()

    expect(result).toBeInstanceOf(AuthTokenMiddleware)
  })
})
