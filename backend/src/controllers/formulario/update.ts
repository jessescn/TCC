import { Controller, errorResponseHandler } from 'controllers'
import { FormularioModel } from 'domain/models/formulario'
import { PermissionKey } from 'domain/profiles'
import { IFormularioService } from 'services/formulario'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields: (keyof FormularioModel)[] = ['nome', 'descricao', 'campos']
  notIncludesInvalidFields(req, validFields)
}

export class UpdateFormularioController extends Controller<IFormularioService> {
  constructor(service: IFormularioService) {
    const permission: PermissionKey = 'formulario_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<FormularioModel>

      const updatedFormulario = await this.service.update(Number(id), data)

      response.json(updatedFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
