import { Controller, errorResponseHandler } from 'controllers'
import { NewTipoProcedimento } from 'repository/sequelize/tipo-procedimento'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export class CreateTipoProcedimentoController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_create'
    const mandatoryFields = [
      'nome',
      'escopo',
      'colegiado',
      'formularios',
      'publicos'
    ]

    super({ permission, mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewTipoProcedimento

      const newTipoProcedimento = await this.service.create(request.user, data)

      response.status(HttpStatusCode.created).send(newTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
