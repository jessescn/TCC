import { Controller, errorResponseHandler } from 'controllers'
import { NewFormulario } from 'repository/sequelize/formulario'
import { IFormularioService } from 'services/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateFormularioController extends Controller<IFormularioService> {
  constructor(service: IFormularioService) {
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
