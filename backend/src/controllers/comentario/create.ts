import { errorResponseHandler } from 'controllers'
import { NewComentario } from 'repository/sequelize/comentario'
import { IComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { ComentarioController } from '.'

export class CreateComentarioController extends ComentarioController {
  constructor(service: IComentarioService) {
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
