import { Controller, errorResponseHandler } from 'controllers'
import { IProcedimentoService } from 'services/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class DeleteProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_delete'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const procedimento = await this.service.delete(Number(id))

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
