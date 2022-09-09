import { Controller, errorResponseHandler } from 'controllers'
import { FormularioModel } from 'models/formulario'
import { IRepository } from 'repository'
import { FormularioRepository } from 'repository/sequelize/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import {
  hasNumericId,
  notIncludesInvalidFields
} from 'utils/validations/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields: (keyof FormularioModel)[] = ['nome', 'descricao', 'campos']
  notIncludesInvalidFields(req, validFields)
}

export class UpdateFormularioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'form_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ permission, validations, repository })
  }

  get repository(): FormularioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<FormularioModel>

      const updatedFormulario = await this.repository.update(Number(id), data)

      response.json(updatedFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
