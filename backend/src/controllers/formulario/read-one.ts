import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { FormularioRepository } from 'repository/sequelize/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/validations/request'

export class ReadOneFormularioController extends Controller {
  constructor(repository: IRepository) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'form_read'

    super({ validations, permission, repository })
  }

  get repository(): FormularioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const formulario = await this.repository.findOne(Number(id))

      response.json(formulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
