import { Controller, errorResponseHandler } from 'controllers'
import { FormularioService } from 'services/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class ReadOneFormularioController extends Controller<FormularioService> {
  constructor(service: FormularioService) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'form_read'

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const formulario = await this.service.findOne(Number(id))

      response.json(formulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
