import { Controller, errorResponseHandler } from 'controllers'
import { IActorService } from 'services/actor'
import { HttpStatusCode, Request, Response } from 'types/express'

export type ChangePasswordPayload = {
  code: string
  password: string
}

export class ChangePasswordController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const mandatoryFields = ['code', 'password']

    super({ mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as ChangePasswordPayload

      await this.service.changeActorPasswordByCode(data.code, data.password)

      response.status(HttpStatusCode.ok).send()
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
