import { Router } from 'express'
import { authController } from 'factories/controllers/auth'
import {
  createProcedimentoController,
  deleteProcedimentoController,
  homologateProcedimentoController,
  readOneProcedimentoController,
  readProcedimentoController,
  reviewProcedimentoController,
  updateProcedimentoController,
  updateStatusProcedimentoController
} from 'factories/controllers/procedimento'
import {
  createUsuarioController,
  deleteUsuarioController,
  publicosUsuarioController,
  readOneUsuarioController,
  readUsuarioController,
  updateUsuarioController
} from 'factories/controllers/actor'

import {
  createComentarioController,
  deleteComentarioController,
  readComentarioController,
  readCommentsByProcedimentoController,
  readOneComentarioController,
  updateComentarioController
} from 'factories/controllers/comentario'
import {
  createTipoProcedimentoController,
  deleteTipoProcedimentoController,
  readOneTipoProcedimentoController,
  readTipoProcedimentoController,
  updateTipoProcedimentoController
} from 'factories/controllers/tipo-procedimento'
import {
  deleteVoteController,
  voteController
} from 'factories/controllers/colegiado'
import {
  createFormularioController,
  deleteFormularioController,
  readFormularioController,
  readOneFormularioController,
  updateFormularioController
} from 'factories/controllers/formulario'
import { authTokenMiddleware } from 'factories/middlewares'

const routes = Router()

routes.post('/token', authController.token)
routes.post('/users', createUsuarioController.exec)

routes.use(authTokenMiddleware.exec)

routes.get('/me', authController.me)

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

routes.get('/procedimentos', readProcedimentoController.exec)
routes.get('/procedimentos/:id', readOneProcedimentoController.exec)
routes.post('/procedimentos', createProcedimentoController.exec)
routes.put('/procedimentos/:id', updateProcedimentoController.exec)
routes.delete('/procedimentos/:id', deleteProcedimentoController.exec)
routes.post(
  '/procedimentos/:id/status',
  updateStatusProcedimentoController.exec
)
routes.post(
  '/procedimentos/:id/homologacao',
  homologateProcedimentoController.exec
)
routes.post('/procedimentos/:id/revisao', reviewProcedimentoController.exec)

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
