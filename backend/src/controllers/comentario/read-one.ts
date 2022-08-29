import { Controller, errorResponseHandler } from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class ReadOneComentarioController extends Controller {
  constructor() {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'comentario_read'

    super({ validations, permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const comentario = await ComentarioService.getById(Number(id))

      response.json(comentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
