import { Controller, errorResponseHandler, Validation } from 'controllers'
import {
  statusList as availableStatus,
  TStatus
} from 'domain/models/procedimento'
import { IProcedimentoService } from 'services/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

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

export class UpdateStatusProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_status'
    const validations = [hasNumericId, checkIfHasInvalidStatus]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as UpdateStatusProcedimento

      const procedimento = await this.service.updateStatus(
        Number(id),
        data.status
      )

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
