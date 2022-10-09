import { errorResponseHandler } from 'controllers'
import { ComentarioModel } from 'domain/models/comentario'
import { PermissionKey } from 'domain/profiles'
import { IComentarioService } from 'services/comentario'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'
import { ComentarioController } from '.'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields = ['conteudo', 'procedimentoId']
  notIncludesInvalidFields(req, validFields)
}

export class UpdateComentarioController extends ComentarioController {
  constructor(service: IComentarioService) {
    const permission: PermissionKey = 'comentario_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<ComentarioModel>

      await this.checkUserPermissionScope(request.actor, Number(id))

      const updatedComentario = await this.service.update(Number(id), data)

      response.json(updatedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
