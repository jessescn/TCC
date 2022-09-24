import { Controller, errorResponseHandler } from 'controllers'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class DeleteTipoProcedimentoController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_update'
    const validations = [hasNumericId]

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedTipoProcedimento = await this.service.delete(Number(id))

      response.json(deletedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
