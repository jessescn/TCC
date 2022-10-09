import { errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { NewComentario } from 'repository/sequelize/comentario'
import { IComentarioService } from 'services/comentario'
import { HttpStatusCode, Request, Response } from 'types/express'
import { ComentarioController } from '.'

export class CreateComentarioController extends ComentarioController {
  constructor(service: IComentarioService) {
    const permission: PermissionKey = 'comentario_create'
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

      const newComentario = await this.service.create(request.actor, data)

      response.status(HttpStatusCode.created).send(newComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
