import { FormularioController } from 'controllers/formulario'
import { Router } from 'express'
import { AuthController } from './controllers/auth'
import { ColegiadoController } from './controllers/colegiado'
import { ProcedimentoController } from './controllers/procedimento'
import { TipoProcedimentoController } from './controllers/tipo-procedimento'
import { UsuarioController } from './controllers/usuario'

import { CreateComentarioController } from 'controllers/comentario/create'
import { DeleteComentarioController } from 'controllers/comentario/delete'
import { ReadComentarioController } from 'controllers/comentario/read'
import { ReadOneComentarioController } from 'controllers/comentario/read-one'
import { UpdateComentarioController } from 'controllers/comentario/update'

import auth from './middlewares/authorization'
import permissions from './middlewares/permissions'

const routes = Router()

routes.post('/token', AuthController.token)
routes.post('/users', UsuarioController.create)

routes.use(auth)
routes.use(permissions)

routes.get('/me', AuthController.me)

routes.get('/users/publicos', UsuarioController.publicos)
routes.get('/users', UsuarioController.read)
routes.get('/users/:id', UsuarioController.readById)
routes.put('/users/:id', UsuarioController.update)
routes.delete('/users/:id', UsuarioController.delete)

routes.get('/formularios', FormularioController.read)
routes.get('/formularios/:id', FormularioController.readById)
routes.post('/formularios', FormularioController.create)
routes.put('/formularios/:id', FormularioController.update)
routes.delete('/formularios/:id', FormularioController.delete)

routes.get('/procedimentos', ProcedimentoController.read)
routes.get('/procedimentos/:id', ProcedimentoController.readById)
routes.post('/procedimentos', ProcedimentoController.create)
routes.put('/procedimentos/:id', ProcedimentoController.update)
routes.delete('/procedimentos/:id', ProcedimentoController.delete)
routes.post('/procedimentos/:id/status', ProcedimentoController.updateStatus)
routes.post('/procedimentos/:id/homologacao', ProcedimentoController.homologate)
routes.post('/procedimentos/:id/revisao', ProcedimentoController.revisao)

routes.post('/colegiado/:id/vote', ColegiadoController.vote)
routes.delete('/colegiado/:id/vote', ColegiadoController.deleteVote)
routes.get('/colegiado/:id/comentarios', ColegiadoController.comments)

routes.get('/tipo-procedimentos', TipoProcedimentoController.read)
routes.get('/tipo-procedimentos/:id', TipoProcedimentoController.readById)
routes.post('/tipo-procedimentos', TipoProcedimentoController.create)
routes.put('/tipo-procedimentos/:id', TipoProcedimentoController.update)
routes.delete('/tipo-procedimentos/:id', TipoProcedimentoController.delete)

routes.get('/comentarios', new ReadComentarioController().exec)
routes.get('/comentarios/:id', new ReadOneComentarioController().exec)
routes.post('/comentarios', new CreateComentarioController().exec)
routes.patch('/comentarios/:id', new UpdateComentarioController().exec)
routes.delete('/comentarios/:id', new DeleteComentarioController().exec)

export { routes }
