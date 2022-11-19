import { Controller, errorResponseHandler, Validation } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { PermissionKey } from 'domain/profiles'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

const notIncludesInvalidUpdateFields: Validation = request => {
  const validFields: (keyof Partial<ActorModel>)[] = [
    'nome',
    'publico',
    'permissoes'
  ]
  notIncludesInvalidFields(request, validFields)
}

export class UpdateActorController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const permission: PermissionKey = 'actor_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<ActorModel>

      const updatedActor = await this.service.update(Number(id), data)

      response.json(updatedActor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
