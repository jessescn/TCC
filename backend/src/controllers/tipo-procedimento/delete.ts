import { Controller, errorResponseHandler } from 'controllers'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class DeleteTipoProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'tipo_procedimento_update'
    const validations = [hasNumericId]

    super({ validations, permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedTipoProcedimento = await TipoProcedimentoService.destroy(
        Number(id)
      )

      response.json(deletedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
