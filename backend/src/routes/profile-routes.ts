import { Router } from 'express'
import { readProfileController } from 'factories/controllers/profile'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const middleware = makeAuthTokenMiddleware().exec

routes.get('/profiles', middleware, readProfileController.exec)

export default routes
