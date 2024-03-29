import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { NewProcedimento } from 'repositories/sequelize/procedimento'
import { IProcedimentoService } from 'services/procedimento'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const mandatoryFields: (keyof NewProcedimento)[] = ['tipo', 'respostas']
    const permission: PermissionKey = 'procedimento_create'

    super({ permission, mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewProcedimento

      const procedimento = await this.service.create(request.actor, data)

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
