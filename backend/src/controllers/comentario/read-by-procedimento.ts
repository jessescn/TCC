import { errorResponseHandler } from 'controllers'
import { ComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { ComentarioController } from '.'

export class ReadCommentsByProcedimentoController extends ComentarioController {
  constructor(service: ComentarioService) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'colegiado_comments'

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      await this.checkUserPermissionScope(request.user, Number(id))

      const comentarios = await this.service.findAll({
        procedimentoId: id
      })

      response.json(comentarios)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
