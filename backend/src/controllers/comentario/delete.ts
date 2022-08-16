import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.comentario_delete
  checkPermissionResource(permission, req)
}

export class DeleteComentarioController extends Controller {
  constructor() {
    const validators = [hasPermissions, hasNumericId]
    super(validators)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedComentario = await ComentarioService.destroy(Number(id))

      response.json(deletedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
