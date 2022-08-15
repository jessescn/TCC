import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { Request, Response } from 'types/express'

export const validators = {
  hasPermissions: (req: Request) => {
    const permission = req.user.permissoes.comentario_delete
    checkPermissionResource(permission, req)
  }
}

export function ReadComentarioController(): Controller {
  const validateRequest = (req: Request) => {
    validators.hasPermissions(req)
  }

  return {
    exec: async (request: Request, response: Response) => {
      try {
        validateRequest(request)

        const comentarios = await ComentarioService.getAll()

        response.send(comentarios)
      } catch (error) {
        errorResponseHandler(response, error)
      }
    }
  }
}
