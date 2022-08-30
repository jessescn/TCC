import { Router } from 'express'
import { AuthController } from './controllers/auth'
import { ProcedimentoController } from './controllers/procedimento'
import {
  createUsuarioController,
  deleteUsuarioController,
  publicosUsuarioController,
  readOneUsuarioController,
  readUsuarioController,
  updateUsuarioController
} from './controllers/usuario'

import {
  createComentarioController,
  deleteComentarioController,
  readComentarioController,
  readCommentsByProcedimentoController,
  readOneComentarioController,
  updateComentarioController
} from 'controllers/comentario'
import {
  createTipoProcedimentoController,
  deleteTipoProcedimentoController,
  readOneTipoProcedimentoController,
  readTipoProcedimentoController,
  updateTipoProcedimentoController
} from 'controllers/tipo-procedimento'
import auth from './middlewares/authorization'
import permissions from './middlewares/permissions'
import { deleteVoteController, voteController } from 'controllers/colegiado'
import {
  createFormularioController,
  deleteFormularioController,
  readFormularioController,
  readOneFormularioController,
  updateFormularioController
} from 'controllers/formulario'

const routes = Router()

routes.post('/token', AuthController.token)
routes.post('/users', createUsuarioController.exec)

routes.use(auth)
routes.use(permissions)

routes.get('/me', AuthController.me)

routes.get('/users/publicos', publicosUsuarioController.exec)
routes.get('/users', readUsuarioController.exec)
routes.get('/users/:id', readOneUsuarioController.exec)
routes.put('/users/:id', updateUsuarioController.exec)
routes.delete('/users/:id', deleteUsuarioController.exec)

routes.get('/formularios', readFormularioController.exec)
routes.get('/formularios/:id', readOneFormularioController.exec)
routes.post('/formularios', createFormularioController.exec)
routes.put('/formularios/:id', updateFormularioController.exec)
routes.delete('/formularios/:id', deleteFormularioController.exec)

routes.get('/procedimentos', ProcedimentoController.read)
routes.get('/procedimentos/:id', ProcedimentoController.readById)
routes.post('/procedimentos', ProcedimentoController.create)
routes.put('/procedimentos/:id', ProcedimentoController.update)
routes.delete('/procedimentos/:id', ProcedimentoController.delete)
routes.post('/procedimentos/:id/status', ProcedimentoController.updateStatus)
routes.post('/procedimentos/:id/homologacao', ProcedimentoController.homologate)
routes.post('/procedimentos/:id/revisao', ProcedimentoController.revisao)

routes.post('/colegiado/:id/vote', voteController.exec)
routes.delete('/colegiado/:id/vote', deleteVoteController.exec)
routes.get(
  '/colegiado/:id/comentarios',
  readCommentsByProcedimentoController.exec
)

routes.get('/tipo-procedimentos', readTipoProcedimentoController.exec)
routes.get('/tipo-procedimentos/:id', readOneTipoProcedimentoController.exec)
routes.post('/tipo-procedimentos', createTipoProcedimentoController.exec)
routes.put('/tipo-procedimentos/:id', updateTipoProcedimentoController.exec)
routes.delete('/tipo-procedimentos/:id', deleteTipoProcedimentoController.exec)

routes.get('/comentarios', readComentarioController.exec)
routes.get('/comentarios/:id', readOneComentarioController.exec)
routes.post('/comentarios', createComentarioController.exec)
routes.patch('/comentarios/:id', updateComentarioController.exec)
routes.delete('/comentarios/:id', deleteComentarioController.exec)

export { routes }
