import { Controller, errorResponseHandler, Validation } from 'controllers'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'
import { notIncludesInvalidFields } from 'utils/request'

type ConfirmEmailPayload = {
  code: string
}

const notIncludesInvalidUpdateFields: Validation = request => {
  const validFields: (keyof ConfirmEmailPayload)[] = ['code']
  notIncludesInvalidFields(request, validFields)
}

export class ConfirmEmailController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const validations = [notIncludesInvalidUpdateFields]

    super({ validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { code } = request.body as ConfirmEmailPayload

      const actor = await this.service.confirmEmailByCode(code)

      response.json(actor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
