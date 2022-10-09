import { errorResponseHandler } from 'controllers'
import { IComentarioService } from 'services/comentario'
import { PermissionKey } from 'domain/profiles'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { ComentarioController } from '.'

export class DeleteComentarioController extends ComentarioController {
  constructor(service: IComentarioService) {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'comentario_delete'

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      await this.checkUserPermissionScope(request.actor, Number(id))

      const deletedComentario = await this.service.delete(Number(id))

      response.json(deletedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
