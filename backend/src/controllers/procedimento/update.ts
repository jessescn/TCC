import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoAttributes, ProcedimentoModel } from 'models/procedimento'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError
} from 'types/express/errors'
import { getCurrentStatus } from 'utils/procedimento'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields: (keyof ProcedimentoModel)[] = [
    'revisoes',
    'respostas',
    'votos'
  ]
  notIncludesInvalidFields(req, validFields)
}

export class UpdateProcedimentoController extends Controller {
  private repository: ProcedimentoRepository

  constructor(repository: IProcedimentoRepo) {
    const permission: PermissionKey = 'procedimento_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ permission, validations, repository })
    this.repository = repository
  }

  private checkIfProcedimentoCanUpdateResposta = async (
    procedimento: ProcedimentoAttributes
  ) => {
    const isOnPendingChangesStatus =
      getCurrentStatus(procedimento) === 'correcoes_pendentes'

    if (!isOnPendingChangesStatus) {
      throw new BadRequestError('Cannot update in this current status')
    }
  }

  private checkIfHasPrivilegesToGetProcedimento = (
    procedimento: ProcedimentoAttributes,
    request: Request
  ) => {
    const scope = request.user.permissoes[this.permission]
    const hasScopeOwned = scope === 'owned'
    const hasScopeAll = scope === 'all'
    const isAuthor = procedimento.createdBy === request.user.id
    const hasPermissionToRead = hasScopeAll || (hasScopeOwned && isAuthor)

    if (!hasPermissionToRead) {
      throw new UnauthorizedError(
        'You not have permission to access this resource.'
      )
    }
  }

  private checkIfProcedimentoExists = (
    procedimento: ProcedimentoAttributes
  ) => {
    if (!procedimento) {
      throw new NotFoundError()
    }
  }

  private validateIfProcedimentoCanUpdate = async (request: Request) => {
    const { id } = request.params
    const data = request.body as Partial<ProcedimentoModel>

    const procedimento = await this.repository.findOne(Number(id))

    this.checkIfProcedimentoExists(procedimento)
    this.checkIfHasPrivilegesToGetProcedimento(procedimento, request)

    if (data.respostas) {
      this.checkIfProcedimentoCanUpdateResposta(procedimento)
    }
  }

  private updateProcedimentoStatusToEmAnalise = (procedimentoId: number) => {
    return this.repository.updateStatus(procedimentoId, 'em_analise')
  }

  private callRepoToUpdateProcedimento = async (request: Request) => {
    const { id } = request.params
    const data = request.body as Partial<ProcedimentoModel>

    await this.repository.update(Number(id), data)

    return this.updateProcedimentoStatusToEmAnalise(Number(id))
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.validateIfProcedimentoCanUpdate(request)
      const procedimento = await this.callRepoToUpdateProcedimento(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
