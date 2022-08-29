import { Controller, errorResponseHandler } from 'controllers'
import { FormularioModel } from 'models/formulario'
import { FormularioService } from 'services/entities/formulario-service'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'validations/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields: (keyof FormularioModel)[] = ['nome', 'descricao', 'campos']
  notIncludesInvalidFields(req, validFields)
}

export class UpdateFormularioController extends Controller {
  constructor() {
    const permission: keyof PermissionKeys = 'form_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ permission, validations })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<FormularioModel>

      const updatedFormulario = await FormularioService.update(Number(id), data)

      response.json(updatedFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
