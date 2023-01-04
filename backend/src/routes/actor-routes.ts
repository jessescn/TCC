import { Router } from 'express'
import {
  createActorController,
  changePasswordController,
  confirmEmailController
} from 'factories/controllers/actor'

const routes = Router()
routes.post('/update-password', changePasswordController.exec)
routes.post('/users', createActorController.exec)
routes.post('/email-verification/code', confirmEmailController.exec)

export default routes
