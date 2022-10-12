import { Controller, errorResponseHandler } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { PermissionKey } from 'domain/profiles'
import { IProfileService } from 'services/profile'
import { Request, Response } from 'types/express'

export class ReadProfileController extends Controller<IProfileService> {
  constructor(service: IProfileService) {
    const permission: PermissionKey = 'profile_read'

    super({ permission, service })
  }

  private getQueryByScope = (actor: ActorModel) => {
    const scope = actor.profile.permissoes[this.permission]

    return scope === 'owned' ? { id: actor.profile.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.actor)
      const profiles = await this.service.findAll(query)

      response.json(profiles)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
