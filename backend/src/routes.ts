import { FormController } from 'controllers/form'
import { Router } from 'express'
import { AuthController } from './controllers/auth'
import { UserController } from './controllers/user'
import auth from './middlewares/authorization'
import permissions from './middlewares/permissions'

const routes = Router()

routes.post('/token', AuthController.token)
routes.post('/users', UserController.create)

routes.use(auth)
routes.use(permissions)

routes.get('/me', AuthController.me)

routes.get('/users', UserController.read)
routes.get('/users/:id', UserController.readById)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

routes.get('/forms', FormController.read)
routes.get('/forms/:id', FormController.readById)
routes.post('/forms', FormController.create)
routes.put('/forms/:id', FormController.update)
routes.delete('/forms/:id', FormController.delete)

export { routes }
