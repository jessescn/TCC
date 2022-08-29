import { hasNumericId } from './../../validations/request'
import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { FormularioService } from 'services/entities/formulario-service'

export class DeleteFormularioController extends Controller {
  constructor() {
    const permission: keyof PermissionKeys = 'form_delete'
    const validations = [hasNumericId]

    super({ permission, validations })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedFormulario = await FormularioService.destroy(Number(id))

      response.json(deletedFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
