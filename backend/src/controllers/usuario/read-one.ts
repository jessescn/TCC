import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
export class ReadOneActorController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const permission: PermissionKey = 'actor_read'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const actor = await this.service.findOne(Number(id))

      response.json(actor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
