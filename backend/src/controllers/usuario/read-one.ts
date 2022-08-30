import { Controller, errorResponseHandler, Validation } from 'controllers'
import { UsuarioService } from 'services/entities/usuario-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { UnauthorizedError } from 'types/express/errors'
import { hasNumericId } from 'validations/request'

const hasAccessToSpecificResource: Validation = request => {
  const { id } = request.params
  const scope = request.user.permissoes.user_read

  if (scope === 'owned' && Number(id) !== request.user.id) {
    throw new UnauthorizedError()
  }
}

export class ReadOneUsuarioController extends Controller {
  constructor() {
    const permission: PermissionKey = 'user_read'
    const validations = [hasNumericId, hasAccessToSpecificResource]

    super({ permission, validations })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const usuario = await UsuarioService.getById(Number(id))

      response.json(usuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
