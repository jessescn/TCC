import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'
import { Request, Response } from 'types/express'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.tipo_procedimento_read
  checkPermissionResource(permission, req)
}

export class ReadTipoProcedimentoController extends Controller {
  constructor() {
    const validations = [hasPermissions]

    super(validations)
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
