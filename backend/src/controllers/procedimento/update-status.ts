import { Controller, errorResponseHandler, Validation } from 'controllers'
import { TStatus, statusList as availableStatus } from 'models/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'
import { BadRequestError } from 'types/express/errors'
import { ProcedimentoService } from 'services/entities/procedimento-service'

type UpdateStatusProcedimento = {
  status: TStatus
}

const checkIfHasInvalidStatus: Validation = request => {
  const { status } = request.body as UpdateStatusProcedimento

  const isValidStatus = Object.keys(availableStatus).includes(status)

  if (!isValidStatus) {
    throw new BadRequestError(`${status} is not an available status`)
  }
}

export class UpdateStatusProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'procedimento_status'
    const validations = [hasNumericId, checkIfHasInvalidStatus]

    super({ permission, validations })
  }

  private callServiceToUpdateStatus = (request: Request) => {
    const { id } = request.params
    const { status } = request.body as UpdateStatusProcedimento

    return ProcedimentoService.updateStatus(Number(id), status)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)
      const procedimento = await this.callServiceToUpdateStatus(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
