import { Router } from 'express'
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
const middleware = makeAuthTokenMiddleware().exec

routes.get('/formularios', middleware, readFormularioController.exec)
routes.get(
  '/formularios/tipo-procedimento/:id',
  middleware,
  readFormulariosByTipoController.exec
)
routes.get('/formularios/:id', middleware, readOneFormularioController.exec)
routes.post('/formularios', middleware, createFormularioController.exec)
routes.put('/formularios/:id', middleware, updateFormularioController.exec)
routes.delete('/formularios/:id', middleware, deleteFormularioController.exec)

export default routes
