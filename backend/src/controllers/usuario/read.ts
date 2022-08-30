import { PermissionKey } from 'types/auth/actors'
import { Controller, errorResponseHandler } from 'controllers'
import { Request, Response } from 'types/express'
import { UserQuery, UsuarioService } from 'services/entities/usuario-service'

export class ReadUsuarioController extends Controller {
  constructor() {
    const permission: PermissionKey = 'user_read'
    super({ permission })
  }

  private getAllUsuarios = (request: Request) => {
    return UsuarioService.getAll()
  }

  private getOnlyOwnedUsuarios = (request: Request) => {
    const query: UserQuery = { id: request.user.id }

    return UsuarioService.getAll(query)
  }

  private getUsuariosByScope = (request: Request) => {
    const scope = request.user.permissoes[this.permission]

    const get =
      scope === 'owned' ? this.getOnlyOwnedUsuarios : this.getAllUsuarios

    return get(request)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const usuarios = await this.getUsuariosByScope(request)

      response.json(usuarios)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
