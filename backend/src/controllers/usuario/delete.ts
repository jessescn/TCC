import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { UsuarioRepository } from 'repository/sequelize/usuario'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

export class DeleteUsuarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'user_delete'
    const validations = [hasNumericId]

    super({ permission, validations, repository })
  }

  get repository(): UsuarioRepository {
    return this.props.repository
  }

  checkIfUsuarioExists = async (id: number) => {
    const usuario = await this.repository.findOne(id)

    if (!usuario) {
      throw new NotFoundError()
    }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      await this.checkIfUsuarioExists(Number(id))

      const deletedUsuario = await this.repository.destroy(Number(id))

      response.json(deletedUsuario)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
