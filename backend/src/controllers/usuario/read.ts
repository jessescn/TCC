import { PermissionKey } from 'types/auth/actors'
import { Controller, errorResponseHandler } from 'controllers'
import { Request, Response } from 'types/express'
import { IRepository } from 'repository'
import { UsuarioQuery, UsuarioRepository } from 'repository/sequelize/usuario'

export class ReadUsuarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'user_read'

    super({ permission, repository })
  }

  get repository(): UsuarioRepository {
    return this.props.repository
  }

  private getAllUsuarios = (request: Request) => {
    return this.repository.findAll()
  }

  private getOnlyOwnedUsuarios = (request: Request) => {
    const query: UsuarioQuery = { id: request.user.id }

    return this.repository.findAll(query)
  }

  private getUsuariosByScope = (request: Request) => {
    const scope = request.user.permissoes[this.permission]

    const get =
      scope === 'owned' ? this.getOnlyOwnedUsuarios : this.getAllUsuarios

    return get(request)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const usuarios = await this.getUsuariosByScope(request)

      response.json(usuarios)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
