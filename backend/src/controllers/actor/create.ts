import { Controller, errorResponseHandler } from 'controllers'
import { NewActor } from 'repositories/sequelize/actor'
import { IActorService } from 'services/actor'
import { HttpStatusCode, Request, Response } from 'types/express'
export class CreateActorController extends Controller<IActorService> {
  constructor(service: IActorService) {
    const mandatoryFields = ['email', 'nome', 'senha']

    super({ mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewActor

      const newActor = await this.service.create({
        email: data.email,
        nome: data.nome,
        senha: data.senha
      })

      response.status(HttpStatusCode.created).send(newActor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
