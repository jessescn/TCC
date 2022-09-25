import { Controller, errorResponseHandler } from 'controllers'
import { IUsuarioService } from 'services/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class DeleteUsuarioController extends Controller<IUsuarioService> {
  constructor(service: IUsuarioService) {
    const permission: PermissionKey = 'user_delete'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedUsuario = await this.service.delete(Number(id))

      response.json(deletedUsuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
