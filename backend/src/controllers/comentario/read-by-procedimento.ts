import { Controller, errorResponseHandler } from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class ReadCommentsByProcedimentoController extends Controller {
  constructor() {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'colegiado_comments'

    super({ permission, validations })
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