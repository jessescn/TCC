import { Router } from 'express'
import {
  bulkCreateActorsController,
  deleteActorController,
  actorsPublicosController,
  readActorController,
  readOneActorController,
  actorSidebarController,
  updateActorController
} from 'factories/controllers/actor'
import { makeAuthTokenMiddleware } from 'factories/middlewares/authorization-factory'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

const routes = Router()
const middleware = makeAuthTokenMiddleware().exec

routes.get('/users/publicos', middleware, actorsPublicosController.exec)
routes.get('/users/sidebar', middleware, actorSidebarController.exec)
routes.get('/users', middleware, readActorController.exec)
routes.get('/users/:id', middleware, readOneActorController.exec)
routes.post(
  '/users/bulk-create',
  middleware,
  upload.single('file'),
  bulkCreateActorsController.exec
)
routes.put('/users/:id', middleware, updateActorController.exec)
routes.delete('/users/:id', middleware, deleteActorController.exec)

export default routes
