import { Controller, errorResponseHandler, Validation } from 'controllers'
import { TStatus, statusList as availableStatus } from 'models/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { BadRequestError, NotFoundError } from 'types/express/errors'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'

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
  private repository: ProcedimentoRepository

  constructor(repository: IProcedimentoRepo) {
    const permission: PermissionKey = 'procedimento_status'
    const validations = [hasNumericId, checkIfHasInvalidStatus]

    super({ permission, validations, repository })
    this.repository = repository
  }

  private checkIfProcedimentoExists = async (request: Request) => {
    const { id } = request.params

    const procedimento = this.repository.findOne(Number(id))

    if (!procedimento) {
      throw new NotFoundError()
    }
  }

  private callRepoToUpdateStatus = (request: Request) => {
    const { id } = request.params
    const { status } = request.body as UpdateStatusProcedimento

    return this.repository.updateStatus(Number(id), status)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.checkIfProcedimentoExists(request)
      const procedimento = await this.callRepoToUpdateStatus(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
