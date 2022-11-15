import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class GetDetailsTipoProcedimentoController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_read'
    const validations = [hasNumericId]

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const details = await this.service.details(Number(id))

      response.json(details)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
