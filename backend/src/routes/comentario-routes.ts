import { Router } from 'express'
import {
  createComentarioController,
  deleteComentarioController,
  readComentarioController,
  readOneComentarioController,
  updateComentarioController
} from 'factories/controllers/comentario'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'

const routes = Router()
const middleware = makeAuthTokenMiddleware().exec

routes.get('/comentarios', middleware, readComentarioController.exec)
routes.get('/comentarios/:id', middleware, readOneComentarioController.exec)
routes.post('/comentarios', middleware, createComentarioController.exec)
routes.patch('/comentarios/:id', middleware, updateComentarioController.exec)
routes.delete('/comentarios/:id', middleware, deleteComentarioController.exec)

export default routes
