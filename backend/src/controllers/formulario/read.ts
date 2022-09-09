import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { FormularioRepository } from 'repository/sequelize/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadFormularioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'form_read'

    super({ permission, repository })
  }

  get repository(): FormularioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const formularios = await this.repository.findAll()

      response.json(formularios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
