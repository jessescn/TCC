import { Controller, errorResponseHandler } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { PermissionKey } from 'domain/profiles'
import { TipoProcedimentoQuery } from 'repository/sequelize/tipo-procedimento'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { Request, Response } from 'types/express'

export class ReadTipoProcedimentoController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_read'

    super({ permission, service })
  }

  getQueryByScope = (actor: ActorModel): TipoProcedimentoQuery => {
    const scope = actor.profile.permissoes[this.permission]

    return scope === 'owned' ? { createdBy: actor.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.actor)
      const tipoProcedimentos = await this.service.findAll(query)

      response.json(tipoProcedimentos)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
