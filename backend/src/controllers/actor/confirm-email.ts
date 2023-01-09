import { Controller, errorResponseHandler } from 'controllers'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'

export type ConfirmEmailPayload = {
  code: string
}

export class ConfirmEmailController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const mandatoryFields = ['code']

    super({ mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { code } = request.body as ConfirmEmailPayload

      const actor = await this.service.verifyActorByCode(code)

      response.json(actor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
