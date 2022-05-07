import { Router } from 'express'
import { AuthController } from './controllers/auth'
import { UserController } from './controllers/user'
import auth from './middlewares/authorization'
import permissions from './middlewares/permissions'

const routes = Router()

routes.post('/token', AuthController.token)

routes.use(auth)
routes.use(permissions)

routes.get('/me', AuthController.me)

routes.post('/users', UserController.create)
routes.get('/users', UserController.read)
routes.get('/users/:id', UserController.read)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

export { routes }
