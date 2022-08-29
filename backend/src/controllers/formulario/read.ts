import { Controller, errorResponseHandler } from 'controllers'
import { FormularioService } from 'services/entities/formulario-service'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadFormularioController extends Controller {
  constructor() {
    const permission: keyof PermissionKeys = 'form_read'

    super({ permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const formularios = await FormularioService.getAll()

      response.json(formularios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
