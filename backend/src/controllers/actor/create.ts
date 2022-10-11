import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { NewActor } from 'repository/sequelize/actor'
import { IActorService } from 'services/actor'
import { HttpStatusCode, Request, Response } from 'types/express'
export class CreateActorController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const permission: PermissionKey = 'actor_create'
    const mandatoryFields = ['email', 'nome', 'senha', 'profile']

    super({ mandatoryFields, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewActor

      const newActor = await this.service.create(data)

      response.status(HttpStatusCode.created).send(newActor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
