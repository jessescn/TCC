import { Controller, errorResponseHandler } from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'validations/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields = ['conteudo', 'procedimentoId']
  notIncludesInvalidFields(req, validFields)
}

export class UpdateComentarioController extends Controller {
  constructor() {
    const permission: keyof PermissionKeys = 'comentario_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ validations, permission })
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
