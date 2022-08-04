import { TipoProcessoController } from './controllers/tipo-processo'
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

routes.get('/formularios', FormularioController.read)
routes.get('/formularios/:id', FormularioController.readById)
routes.post('/formularios', FormularioController.create)
routes.put('/formularios/:id', FormularioController.update)
routes.delete('/formularios/:id', FormularioController.delete)

routes.get('/processos', ProcessoController.read)
routes.get('/processos/:id', ProcessoController.readById)
routes.post('/processos', ProcessoController.create)
routes.put('/processos/:id', ProcessoController.update)
routes.delete('/processos/:id', ProcessoController.delete)
routes.post('/processos/:id/vote', ProcessoController.vote)
routes.get('/processos/:id/comentarios', ProcessoController.comentarios)
routes.post('/processos/:id/status', ProcessoController.updateStatus)
routes.post('/processos/:id/homologacao', ProcessoController.homologate)

routes.get('/tipo-processos', TipoProcessoController.read)
routes.get('/tipo-processos/:id', TipoProcessoController.readById)
routes.post('/tipo-processos', TipoProcessoController.create)
routes.put('/tipo-processos/:id', TipoProcessoController.update)
routes.delete('/tipo-processos/:id', TipoProcessoController.delete)

routes.get('/comentarios', ComentarioController.read)
routes.get('/comentarios/:id', ComentarioController.readById)
routes.post('/comentarios', ComentarioController.create)
routes.put('/comentarios/:id', ComentarioController.update)
routes.delete('/comentarios/:id', ComentarioController.delete)

export { routes }
