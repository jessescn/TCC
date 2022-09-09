import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { UsuarioRepository } from 'repository/sequelize/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { Usuario } from 'usecases/usuario'

export class PublicosUsuarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'user_publicos'

    super({ permission, repository })
  }

  get repository(): UsuarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const usuarios = await this.repository.findAll()

      const publicos = Usuario.getPublicos(usuarios)

      response.json(publicos)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
