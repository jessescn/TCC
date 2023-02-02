import { Router } from 'express'
import {
  sendAccountVerificationEmailUseCaseController,
  sendChangePasswordEmailController
} from 'factories/controllers/actor'
import {
  authController,
  tokenController
} from 'factories/controllers/authentication'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const authTokenMiddleware = makeAuthTokenMiddleware()

routes.post('/token', tokenController.exec)
routes.post('/change-password', sendChangePasswordEmailController.exec)

routes.get('/me', authTokenMiddleware.exec, authController.me)
routes.post(
  '/email-verification',
  authTokenMiddleware.exec,
  sendAccountVerificationEmailUseCaseController.exec
)

export default routes
