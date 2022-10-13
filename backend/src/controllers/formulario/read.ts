import { Controller, errorResponseHandler } from 'controllers'
import { ActorModel } from 'domain/models/actor'
import { PermissionKey } from 'domain/profiles'
import { FormularioQuery } from 'repositories/sequelize/formulario'
import { IFormularioService } from 'services/formulario'
import { Request, Response } from 'types/express'

export class ReadFormularioController extends Controller<IFormularioService> {
  constructor(service: IFormularioService) {
    const permission: PermissionKey = 'formulario_read'

    super({ permission, service })
  }

  getQueryByScope(actor: ActorModel): FormularioQuery {
    const scope = actor.profile.permissoes[this.permission]

    return scope === 'owned' ? { createdBy: actor.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const scope = this.getQueryByScope(request.actor)

      const formularios = await this.service.findAll(scope)

      response.json(formularios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
