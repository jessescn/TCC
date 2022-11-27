import { Controller, errorResponseHandler, Validation } from 'controllers'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'
import { notIncludesInvalidFields } from 'utils/request'

type ChangePasswordPayload = {
  code: string
  password: string
}

const notIncludesInvalidUpdateFields: Validation = request => {
  const validFields: (keyof ChangePasswordPayload)[] = ['code', 'password']
  notIncludesInvalidFields(request, validFields)
}

export class ChangePasswordController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const validations = [notIncludesInvalidUpdateFields]

    super({ validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as ChangePasswordPayload

      await this.service.changePassword(data.code, data.password)

      response.status(200).send()
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
