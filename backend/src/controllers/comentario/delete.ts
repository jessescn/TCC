import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'

export const validators = {
  hasPermissions: (req: Request) => {
    const permission = req.user.permissoes.comentario_delete
    checkPermissionResource(permission, req)
  },
  hasNumericId: (req: Request) => {
    const { id } = req.params

    if (!isNumber(id)) {
      throw new BadRequestError()
    }
  }
}

export function DeleteComentarioController(): Controller {
  const validateRequest = (req: Request) => {
    validators.hasPermissions(req)
    validators.hasNumericId(req)
  }

  return {
    exec: async (request: Request, response: Response) => {
      try {
        validateRequest(request)

        const { id } = request.params

        const deletedComentario = await ComentarioService.destroy(Number(id))

        response.json(deletedComentario)
      } catch (error) {
        errorResponseHandler(response, error)
      }
    }
  }
}
