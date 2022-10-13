import { errorResponseHandler } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { ComentarioQuery } from 'repositories/sequelize/comentario'
import { IComentarioService } from 'services/comentario'
import { PermissionKey } from 'domain/profiles'
import { Request, Response } from 'types/express'
import { ComentarioController } from '.'

export class ReadComentarioController extends ComentarioController {
  constructor(service: IComentarioService) {
    const permission: PermissionKey = 'comentario_read'

    super({ permission, service })
  }

  getQueryByScope(actor: ActorModel): ComentarioQuery {
    const scope = actor.profile.permissoes[this.permission]

    return scope === 'owned' ? { createdBy: actor.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.actor)
      const comentarios = await this.service.findAll(query)

      response.json(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
