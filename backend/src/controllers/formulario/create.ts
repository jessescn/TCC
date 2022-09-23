import { Controller, errorResponseHandler } from 'controllers'
import { NewFormulario } from 'models/formulario'
import { FormularioService } from 'services/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateFormularioController extends Controller<FormularioService> {
  constructor(service: FormularioService) {
    const permission: keyof PermissionKeys = 'form_create'
    const mandatoryFields = ['nome', 'campos']

    super({ mandatoryFields, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewFormulario

      const newFormulario = await this.service.create(request.user, data)

      response.status(HttpStatusCode.created).send(newFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
