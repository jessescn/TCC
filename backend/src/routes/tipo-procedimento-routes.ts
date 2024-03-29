import { Router } from 'express'
import {
  analyzableDataController,
  createTipoProcedimentoController,
  deleteTipoProcedimentoController,
  exportDataController,
  readOneTipoProcedimentoController,
  readTipoProcedimentoController,
  updateTipoProcedimentoController
} from 'factories/controllers/tipo-procedimento'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const middleware = makeAuthTokenMiddleware().exec

routes.get(
  '/tipo-procedimentos',
  middleware,
  readTipoProcedimentoController.exec
)
routes.get(
  '/tipo-procedimentos/:id',
  middleware,
  readOneTipoProcedimentoController.exec
)
routes.post(
  '/tipo-procedimentos',
  middleware,
  createTipoProcedimentoController.exec
)
routes.put(
  '/tipo-procedimentos/:id',
  middleware,
  updateTipoProcedimentoController.exec
)
routes.delete(
  '/tipo-procedimentos/:id',
  middleware,
  deleteTipoProcedimentoController.exec
)
routes.get(
  '/tipo-procedimentos/:id/export-data',
  middleware,
  exportDataController.exec
)
routes.post(
  '/tipo-procedimentos/:id/analyzable-data',
  middleware,
  analyzableDataController.exec
)

export default routes
