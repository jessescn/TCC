import { Controller, errorResponseHandler } from 'controllers'
import { RemoteFormulario } from 'models/formulario'
import { FormularioService } from 'services/entities/formulario-service'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateFormularioController extends Controller {
  constructor() {
    const mandatoryFields = ['nome', 'campos']
    const permission: keyof PermissionKeys = 'form_create'

    super({ mandatoryFields, permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as RemoteFormulario

      const newFormulario = await FormularioService.create({
        campos: data.campos,
        nome: data.nome,
        descricao: data.descricao,
        createdBy: request.user.id
      })

      response.status(HttpStatusCode.created).json(newFormulario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
