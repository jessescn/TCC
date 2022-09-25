import { Controller, errorResponseHandler } from 'controllers'
import { UserModel } from 'domain/models/user'
import { FormularioQuery } from 'repository/sequelize/formulario'
import { IFormularioService } from 'services/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadFormularioController extends Controller<IFormularioService> {
  constructor(service: IFormularioService) {
    const permission: keyof PermissionKeys = 'form_read'

    super({ permission, service })
  }

  getQueryByScope(usuario: UserModel): FormularioQuery {
    const scope = usuario.permissoes[this.permission]

    return scope === 'owned' ? { createdBy: usuario.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const scope = this.getQueryByScope(request.user)

      const formularios = await this.service.findAll(scope)

      response.json(formularios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
