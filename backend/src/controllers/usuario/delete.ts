import { Controller, errorResponseHandler } from 'controllers'
import { UsuarioService } from 'services/entities/usuario-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class DeleteUsuarioController extends Controller {
  constructor() {
    const permission: PermissionKey = 'user_delete'
    const validations = [hasNumericId]

    super({ permission, validations })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedUsuario = await UsuarioService.destroy(Number(id))

      response.json(deletedUsuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
