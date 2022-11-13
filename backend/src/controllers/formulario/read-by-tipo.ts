import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IFormularioService } from 'services/formulario'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class ReadFormulariosByTipoController extends Controller<IFormularioService> {
  constructor(service: IFormularioService) {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'formulario_read'

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      console.log({ id }, 'BATEU AQUI')

      const formularios = await this.service.findByTipo(Number(id))

      response.json(formularios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
