import { Controller, errorResponseHandler } from 'controllers'
import { FormularioService } from 'services/entities/formulario-service'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class ReadOneFormularioController extends Controller {
  constructor() {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'form_read'

    super({ validations, permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const formulario = await FormularioService.getById(Number(id))

      response.json(formulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
