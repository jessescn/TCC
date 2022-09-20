import { errorResponseHandler } from 'controllers'
import { ComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { ComentarioController } from '.'

export class DeleteComentarioController extends ComentarioController {
  constructor(service: ComentarioService) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'comentario_delete'

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      await this.checkUserPermissionScope(request.user, Number(id))

      const deletedComentario = await this.service.delete(Number(id))

      response.json(deletedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
