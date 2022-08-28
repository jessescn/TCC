import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.colegiado_comments
  checkPermissionResource(permission, req)
}

export class ReadCommentsByProcedimentoController extends Controller {
  constructor() {
    const validations = [hasNumericId, hasPermissions]
    super(validations)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const comentarios = await ComentarioService.getAll({ procedimentoId: id })

      response.json(comentarios)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
