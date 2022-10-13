import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { NewFormulario } from 'repositories/sequelize/formulario'
import { IFormularioService } from 'services/formulario'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateFormularioController extends Controller<IFormularioService> {
  constructor(service: IFormularioService) {
    const permission: PermissionKey = 'formulario_create'
    const mandatoryFields = ['nome', 'campos']

    super({ mandatoryFields, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewFormulario

      const newFormulario = await this.service.create(request.actor, data)

      response.status(HttpStatusCode.created).send(newFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
