import { Controller, errorResponseHandler } from 'controllers'
import { IUsuarioService } from 'services/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
export class ReadOneUsuarioController extends Controller<IUsuarioService> {
  constructor(service: IUsuarioService) {
    const permission: PermissionKey = 'user_read'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const usuario = await this.service.findOne(Number(id))

      response.json(usuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
