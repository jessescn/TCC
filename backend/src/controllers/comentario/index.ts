import { Controller } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { IComentarioService } from 'services/comentario'
import { UnauthorizedError } from 'types/express/errors'

export abstract class ComentarioController extends Controller<IComentarioService> {
  async checkUserPermissionScope(actor: ActorModel, id: number) {
    const scope = actor.profile.permissoes[this.permission]

    if (scope === 'owned') {
      const comentario = await this.service.findOne(id)

      if (comentario.actor.id !== actor.id) {
        throw new UnauthorizedError()
      }
    }
  }
}
