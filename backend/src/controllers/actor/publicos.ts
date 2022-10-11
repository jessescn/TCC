import { Controller, errorResponseHandler } from 'controllers'
import { IActorService } from 'services/actor'
import { Request, Response } from 'types/express'

export class PublicosController extends Controller<IActorService> {
  constructor(service: IActorService) {
    super({ service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const publicos = await this.service.getPublicos()

      response.json(publicos)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
