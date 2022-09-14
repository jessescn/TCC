import { Controller, errorResponseHandler } from 'controllers'
import { ComentarioModel } from 'models/comentario'
import { IRepository } from 'repository'
import { ComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields = ['conteudo', 'procedimentoId']
  notIncludesInvalidFields(req, validFields)
}

export class UpdateComentarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'comentario_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ validations, permission, repository })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<ComentarioModel>

      const updatedComentario = await ComentarioService.update(Number(id), data)

      response.json(updatedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
