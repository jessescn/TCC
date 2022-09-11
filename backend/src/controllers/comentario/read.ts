import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioRepository } from 'repository/sequelize/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadComentarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'comentario_delete'

    super({ permission, repository })
  }

  get repository(): ComentarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const comentarios = await this.repository.findAll()

      response.send(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
