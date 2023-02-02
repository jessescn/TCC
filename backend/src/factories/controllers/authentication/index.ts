import { AuthController } from 'controllers/auth'
import { makeTokenController } from './token-factory'

export const makeAuthController = () => {
  return new AuthController()
}

export const authController = makeAuthController()
export const tokenController = makeTokenController()
