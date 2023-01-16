import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class AnalyzableDataController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_create'
    const validations = [hasNumericId]
    const mandatoryFields = ['campo', 'formulario']

    super({ permission, validations, service, mandatoryFields })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const { campo, formulario } = request.body

      const data = await this.service.analyzableData(
        Number(id),
        Number(formulario),
        campo
      )

      response.json(data)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
