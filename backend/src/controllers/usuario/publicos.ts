import { Controller, errorResponseHandler } from 'controllers'
import { UsuarioService } from 'services/entities/usuario-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class PublicosUsuarioController extends Controller {
  constructor() {
    const permission: PermissionKey = 'user_publicos'
    super({ permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const publicos = await UsuarioService.getAllPublicos()

      response.json(publicos)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
