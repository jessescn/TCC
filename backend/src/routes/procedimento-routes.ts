import { Router } from 'express'
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
  updateStatusProcedimentoController,
  forwardToSecretariaPreviewController,
  forwardToSecretariaController
} from 'factories/controllers/procedimento'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const middleware = makeAuthTokenMiddleware().exec

routes.get('/procedimentos', middleware, readProcedimentoController.exec)
routes.get(
  '/procedimentos/actor',
  middleware,
  readActorProcedimentoController.exec
)
routes.get('/procedimentos/:id', middleware, readOneProcedimentoController.exec)
routes.get(
  '/procedimentos/:id/encaminhamento-preview',
  middleware,
  forwardToSecretariaPreviewController.exec
)
routes.post(
  '/procedimentos/:id/encaminhamento-secretaria',
  middleware,
  forwardToSecretariaController.exec
)
routes.get(
  '/procedimentos/:id/detalhes',
  middleware,
  getDetailsProcedimentoController.exec
)
routes.post('/procedimentos', middleware, createProcedimentoController.exec)
routes.put('/procedimentos/:id', middleware, updateProcedimentoController.exec)
routes.delete(
  '/procedimentos/:id',
  middleware,
  deleteProcedimentoController.exec
)
routes.post(
  '/procedimentos/:id/status',
  middleware,
  updateStatusProcedimentoController.exec
)
routes.post(
  '/procedimentos/:id/homologacao',
  middleware,
  homologateProcedimentoController.exec
)
routes.post(
  '/procedimentos/:id/revisao',
  middleware,
  reviewProcedimentoController.exec
)

export default routes
