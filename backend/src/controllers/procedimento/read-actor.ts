import {
  Controller,
  errorResponseHandler,
  extractPagination
} from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IProcedimentoService } from 'services/procedimento'
import { Request, Response } from 'types/express'

export class ReadActorProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_read'

    super({ permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const pagination = extractPagination(request)

      const query = { createdBy: request.actor.id, deleted: false }
      const result = await this.service.findAll(query, pagination)

      response.json(result)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
