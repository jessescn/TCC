import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'validations/request'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.comentario_update
  checkPermissionResource(permission, req)
}

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields = ['conteudo', 'procedimentoId']
  notIncludesInvalidFields(req, validFields)
}

export const validators = {}

export class UpdateComentarioController extends Controller {
  constructor() {
    const validators = [
      hasPermissions,
      hasNumericId,
      notIncludesInvalidUpdateFields
    ]

    super(validators)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body

      const updatedComentario = await ComentarioService.update(Number(id), data)

      response.json(updatedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
