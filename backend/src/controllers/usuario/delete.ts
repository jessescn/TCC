import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class DeleteActorController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const permission: PermissionKey = 'actor_delete'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedActor = await this.service.delete(Number(id))

      response.json(deletedActor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
