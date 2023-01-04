import { Router } from 'express'
import { authController } from 'factories/controllers/auth'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const authTokenMiddleware = makeAuthTokenMiddleware()

routes.post('/token', authController.token)
routes.post('/change-password', authController.sendChangePasswordCode)

routes.get('/me', authTokenMiddleware.exec, authController.me)
routes.post(
  '/email-verification',
  authTokenMiddleware.exec,
  authController.sendConfirmationCode
)

export default routes
