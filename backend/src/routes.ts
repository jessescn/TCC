import { Router } from 'express'
import { authController } from 'factories/controllers/auth'
import {
  createProcedimentoController,
  deleteProcedimentoController,
  getDetailsProcedimentoController,
  homologateProcedimentoController,
  readActorProcedimentoController,
  readOneProcedimentoController,
  readProcedimentoController,
  reviewProcedimentoController,
  updateProcedimentoController,
  updateStatusProcedimentoController
} from 'factories/controllers/procedimento'
import {
  createActorController,
  deleteActorController,
  publicosController,
  readOneActorController,
  readActorController,
  updateActorController
} from 'factories/controllers/actor'

import { readProfileController } from 'factories/controllers/profile'

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
  readEmHomologacaoController,
  voteController
} from 'factories/controllers/colegiado'
import {
  createFormularioController,
  deleteFormularioController,
  readFormulariosByTipoController,
  readFormularioController,
  readOneFormularioController,
  updateFormularioController
} from 'factories/controllers/formulario'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const authTokenMiddleware = makeAuthTokenMiddleware()

routes.get('/', (req, res) => {
  res.send('api is running!')
})

routes.post('/token', authController.token)
routes.post('/users', createActorController.exec)

routes.use(authTokenMiddleware.exec)

routes.get('/me', authController.me)

routes.get('/users/publicos', publicosController.exec)
routes.get('/users', readActorController.exec)
routes.get('/users/:id', readOneActorController.exec)
routes.put('/users/:id', updateActorController.exec)
routes.delete('/users/:id', deleteActorController.exec)

routes.get('/profiles', readProfileController.exec)

routes.get('/formularios', readFormularioController.exec)
routes.get(
  '/formularios/tipo-procedimento/:id',
  readFormulariosByTipoController.exec
)
routes.get('/formularios/:id', readOneFormularioController.exec)
routes.post('/formularios', createFormularioController.exec)
routes.put('/formularios/:id', updateFormularioController.exec)
routes.delete('/formularios/:id', deleteFormularioController.exec)

routes.get('/procedimentos', readProcedimentoController.exec)
routes.get('/procedimentos/actor', readActorProcedimentoController.exec)
routes.get('/procedimentos/:id', readOneProcedimentoController.exec)
routes.get('/procedimentos/:id/detalhes', getDetailsProcedimentoController.exec)
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

routes.get('/colegiado/procedimentos', readEmHomologacaoController.exec)
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
