import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class HomologateProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'procedimento_homologacao'
    const validations = [hasNumericId]

    super({ permission, validations })
  }

  private getProcedimentoWithUpdatedStatus = (request: Request) => {
    const { id } = request.params
    return ProcedimentoService.getById(Number(id))
  }

  private callServiceToUpdateStatus = async (request: Request) => {
    const { id } = request.params

    await ProcedimentoService.updateStatus(Number(id), 'deferido')
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.callServiceToUpdateStatus(request)
      const procedimento = await this.getProcedimentoWithUpdatedStatus(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
