import { Controller, errorResponseHandler } from 'controllers'
import { IUsuarioService } from 'services/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class PublicosUsuarioController extends Controller<IUsuarioService> {
  constructor(service: IUsuarioService) {
    const permission: PermissionKey = 'user_publicos'

    super({ permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const publicos = await this.service.getPublicos()

      response.json(publicos)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
