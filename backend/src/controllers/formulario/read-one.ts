import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { FormularioRepository } from 'repository/sequelize/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

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

      if (!formulario) {
        throw new NotFoundError()
      }

      response.json(formulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
