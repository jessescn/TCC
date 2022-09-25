import { Controller, errorResponseHandler } from 'controllers'
import { UserModel } from 'models/user'
import { IUsuarioService } from 'services/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadUsuarioController extends Controller<IUsuarioService> {
  constructor(service: IUsuarioService) {
    const permission: PermissionKey = 'user_read'

    super({ permission, service })
  }

  private getQueryByScope = (usuario: UserModel) => {
    const scope = usuario.permissoes[this.permission]

    return scope === 'owned' ? { id: usuario.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.user)
      const usuarios = await this.service.findAll(query)

      response.json(usuarios)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
