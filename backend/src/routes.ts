import { ComentarioController } from './controllers/comentario'
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

routes.get('/processos', ProcessoController.read)
routes.get('/processos/:id', ProcessoController.readById)
routes.post('/processos', ProcessoController.create)
routes.put('/processos/:id', ProcessoController.update)
routes.delete('/processos/:id', ProcessoController.delete)

routes.get('/comentarios', ComentarioController.read)
routes.get('/comentarios/:id', ComentarioController.readById)
routes.post('/comentarios', ComentarioController.create)
routes.put('/comentarios/:id', ComentarioController.update)
routes.delete('/comentarios/:id', ComentarioController.delete)

export { routes }
