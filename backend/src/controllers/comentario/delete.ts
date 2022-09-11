import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioRepository } from 'repository/sequelize/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

export class DeleteComentarioController extends Controller {
  constructor(repository: IRepository) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'comentario_delete'

    super({ validations, permission, repository })
  }

  get repository(): ComentarioRepository {
    return this.props.repository
  }

  private checkIfComentarioExists = async (id: number) => {
    const comentario = await this.repository.findOne(id)

    if (!comentario) {
      throw new NotFoundError('comentario does not exists')
    }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      await this.checkIfComentarioExists(Number(id))

      const deletedComentario = await this.repository.destroy(Number(id))

      response.json(deletedComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
