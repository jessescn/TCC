import { Controller, errorResponseHandler } from 'controllers'
import { RemoteFormulario } from 'models/formulario'
import { IRepository } from 'repository'
import { FormularioRepository } from 'repository/sequelize/formulario'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateFormularioController extends Controller {
  constructor(repository: IRepository) {
    const mandatoryFields = ['nome', 'campos']
    const permission: keyof PermissionKeys = 'form_create'

    super({ mandatoryFields, permission, repository })
  }

  get repository(): FormularioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as RemoteFormulario

      const newFormulario = await this.repository.create({
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
