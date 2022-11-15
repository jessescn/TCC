import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'

export class SidebarInfoController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const permission: PermissionKey = 'actor_read'

    super({ permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const sidebarInfo = await this.service.getSidebarInfo(request.actor.id)

      response.json(sidebarInfo)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
