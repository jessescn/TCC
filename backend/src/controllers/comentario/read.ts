import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { Request, Response } from 'types/express'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.comentario_delete
  checkPermissionResource(permission, req)
}

export class ReadComentarioController extends Controller {
  constructor() {
    const validators = [hasPermissions]
    super(validators)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const comentarios = await ComentarioService.getAll()

      response.send(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
