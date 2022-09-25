import { Controller, errorResponseHandler } from 'controllers'
import {
  CreateProcedimento,
  NewProcedimento
} from 'repository/sequelize/procedimento'
import { IProcedimentoService } from 'services/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const mandatoryFields: (keyof CreateProcedimento)[] = ['tipo', 'respostas']
    const permission: PermissionKey = 'procedimento_create'

    super({ permission, mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewProcedimento

      const procedimento = await this.service.create(request.user, data)

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
