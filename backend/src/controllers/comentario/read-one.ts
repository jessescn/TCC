import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioRepository } from 'repository/sequelize/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

export class ReadOneComentarioController extends Controller {
  constructor(repository: IRepository) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'comentario_read'

    super({ validations, permission, repository })
  }

  get repository(): ComentarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const comentario = await this.repository.findOne(Number(id))

      if (!comentario) {
        throw new NotFoundError()
      }

      response.json(comentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
