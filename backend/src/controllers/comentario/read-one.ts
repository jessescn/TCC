import { errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IComentarioService } from 'services/comentario'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { ComentarioController } from '.'

export class ReadOneComentarioController extends ComentarioController {
  constructor(service: IComentarioService) {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'comentario_read'

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      await this.checkUserPermissionScope(request.actor, Number(id))

      const comentario = await this.service.findOne(Number(id))

      response.json(comentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
