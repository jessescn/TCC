import { Controller, errorResponseHandler } from 'controllers'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadTipoProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'tipo_procedimento_read'
    super({ permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const tipoProcedimentos = await TipoProcedimentoService.getAll()

      response.send(tipoProcedimentos)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
