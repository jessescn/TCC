import { PermissionKey } from 'domain/profiles'
import { Controller, errorResponseHandler } from 'controllers'
import { IActorService } from 'services/actor'
import { HttpStatusCode, Request, Response } from 'types/express'

export class BulkCreateActorsController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const permission: PermissionKey = 'actor_update'

    super({ service, permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      const data = request.file

      const newActors = await this.service.bulkCreate(data.path)

      response.status(HttpStatusCode.created).send(newActors)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
