import { hasNumericId } from 'utils/request'
import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { IRepository } from 'repository'
import { FormularioRepository } from 'repository/sequelize/formulario'
import { NotFoundError } from 'types/express/errors'

export class DeleteFormularioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'form_delete'
    const validations = [hasNumericId]

    super({ permission, validations, repository })
  }

  get repository(): FormularioRepository {
    return this.props.repository
  }

  checkIfFormularioExists = async (id: number) => {
    const formulario = await this.repository.findOne(id)

    if (!formulario) {
      throw new NotFoundError()
    }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      await this.checkIfFormularioExists(Number(id))

      const deletedFormulario = await this.repository.destroy(Number(id))

      response.json(deletedFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
