import { Controller, errorResponseHandler } from 'controllers'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class ReadOneTipoProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'tipo_procedimento_read'
    const validations = [hasNumericId]

    super({ validations, permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const tipoProcedimento = await TipoProcedimentoService.getById(Number(id))

      response.json(tipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
