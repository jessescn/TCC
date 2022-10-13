import { errorResponseHandler } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { PermissionKey } from 'domain/profiles'
import { ComentarioQuery } from 'repositories/sequelize/comentario'
import { IComentarioService } from 'services/comentario'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { ComentarioController } from '.'

export class ReadCommentsByProcedimentoController extends ComentarioController {
  constructor(service: IComentarioService) {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'colegiado_comments_read'

    super({ permission, validations, service })
  }

  getQueryByScope(actor: ActorModel, procedimentoId: number): ComentarioQuery {
    const scope = actor.profile.permissoes[this.permission]

    return scope === 'owned'
      ? { createdBy: actor.id, procedimentoId }
      : { procedimentoId }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const query = this.getQueryByScope(request.actor, Number(id))

      const comentarios = await this.service.findAll(query)

      response.json(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
