import { hasNumericId } from 'utils/request'
import { Controller, errorResponseHandler } from 'controllers'
import { Request, Response } from 'types/express'
import { IFormularioService } from 'services/formulario'
import { PermissionKey } from 'domain/profiles'

export class DeleteFormularioController extends Controller<IFormularioService> {
  constructor(service: IFormularioService) {
    const permission: PermissionKey = 'formulario_delete'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedFormulario = await this.service.delete(Number(id))

      response.json(deletedFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
