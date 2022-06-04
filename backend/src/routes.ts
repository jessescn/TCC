import { FormularioController } from 'controllers/formulario'
import { Router } from 'express'
import { AuthController } from './controllers/auth'
import { UserController } from './controllers/user'
import { ProcessoController } from './controllers/processo'

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

routes.get('/forms', FormularioController.read)
routes.get('/forms/:id', FormularioController.readById)
routes.post('/forms', FormularioController.create)
routes.put('/forms/:id', FormularioController.update)
routes.delete('/forms/:id', FormularioController.delete)

routes.get('/process', ProcessoController.read)
routes.get('/process/:id', ProcessoController.readById)
routes.post('/process', ProcessoController.create)
routes.put('/process/:id', ProcessoController.update)
routes.delete('/process/:id', ProcessoController.delete)

export { routes }
