import {
  Controller,
  errorResponseHandler,
  extractPagination
} from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { PermissionKey } from 'domain/profiles'
import { IProcedimentoService } from 'services/procedimento'
import { Request, Response } from 'types/express'

export class ReadProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_read'

    super({ permission, service })
  }

  private getQueryByScope(actor: ActorModel) {
    const scope = actor.profile.permissoes[this.permission]

    return scope === 'owned' ? { createdBy: actor.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const pagination = extractPagination(request)

      const query = this.getQueryByScope(request.actor)
      const procedimentos = await this.service.findAll(query, pagination)

      response.json(procedimentos)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
