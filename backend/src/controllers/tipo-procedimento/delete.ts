import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.tipo_procedimento_update
  checkPermissionResource(permission, req)
}

export class DeleteTipoProcedimentoController extends Controller {
  constructor() {
    const validations = [hasPermissions, hasNumericId]
    super(validations)
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
