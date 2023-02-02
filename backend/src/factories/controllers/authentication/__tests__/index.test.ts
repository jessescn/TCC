import { AuthController } from 'controllers/auth'
import { makeAuthController } from '..'

describe('AuthController Factory', () => {
  it('should create a instance of AuthController', () => {
    const result = makeAuthController()

    expect(result).toBeInstanceOf(AuthController)
  })
})
