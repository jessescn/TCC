import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class ExportDataController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_create'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const data = await this.service.exportData(Number(id))

      response.json(data)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
