import { Controller, errorResponseHandler } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { PermissionKey } from 'domain/profiles'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'

export class ReadActorController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const permission: PermissionKey = 'actor_read'

    super({ permission, service })
  }

  private getQueryByScope = (actor: ActorModel) => {
    const scope = actor.profile.permissoes[this.permission]

    return scope === 'owned' ? { id: actor.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.actor)
      const actors = await this.service.findAll(query)

      response.json(actors)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
