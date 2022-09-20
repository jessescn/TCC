import { errorResponseHandler } from 'controllers'
import { ComentarioService, NewComentario } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { ComentarioController } from '.'

export class CreateComentarioController extends ComentarioController {
  constructor(service: ComentarioService) {
    const permission: keyof PermissionKeys = 'comentario_create'
    const mandatoryFields: (keyof NewComentario)[] = [
      'conteudo',
      'procedimento'
    ]

    super({ mandatoryFields, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewComentario

      const newComentario = await this.service.create(request.user, data)

      response.status(HttpStatusCode.created).send(newComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
