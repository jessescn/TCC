import { Controller, errorResponseHandler, Validation } from 'controllers'
import { IRepository } from 'repository'
import { UsuarioRepository } from 'repository/sequelize/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

const hasAccessToSpecificResource: Validation = request => {
  const { id } = request.params
  const scope = request.user.permissoes.user_read

  if (scope === 'owned' && Number(id) !== request.user.id) {
    throw new UnauthorizedError()
  }
}

export class ReadOneUsuarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'user_read'
    const validations = [hasNumericId, hasAccessToSpecificResource]

    super({ permission, validations, repository })
  }

  get repository(): UsuarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const usuario = await this.repository.findOne(Number(id))

      if (!usuario) {
        throw new NotFoundError()
      }

      response.json(usuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
