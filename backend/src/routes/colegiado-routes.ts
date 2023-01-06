import { Router } from 'express'
import {
  deleteVoteController,
  readEmHomologacaoController,
  voteController
} from 'factories/controllers/colegiado'
import { readCommentsByProcedimentoController } from 'factories/controllers/comentario'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const middleware = makeAuthTokenMiddleware().exec

routes.get(
  '/colegiado/procedimentos',
  middleware,
  readEmHomologacaoController.exec
)
routes.post('/colegiado/vote', middleware, voteController.exec)
routes.delete('/colegiado/vote', middleware, deleteVoteController.exec)
routes.get(
  '/colegiado/:id/comentarios',
  middleware,
  readCommentsByProcedimentoController.exec
)

export default routes
