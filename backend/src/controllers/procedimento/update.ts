import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoModel } from 'models/procedimento'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { BadRequestError, UnauthorizedError } from 'types/express/errors'
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

  private getProcedimentoById = (request: Request) => {
    const { id } = request.params
    return this.repository.findOne(Number(id))
  }

  private checkIfHasPrivilegesToGetProcedimento = async (request: Request) => {
    const procedimento = await this.getProcedimentoById(request)

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

  private callServiceToUpdateProcedimento = async (request: Request) => {
    const { id } = request.params
    const data = request.body as Partial<ProcedimentoModel>

    return this.repository.update(Number(id), data)
  }

  private updateProcedimentoStatusToEmAnalise = (procedimentoId: number) => {
    return this.repository.updateStatus(procedimentoId, 'em_analise')
  }

  private getProcedimentoWithUpdatedStatus = async (request: Request) => {
    const procedimento = await this.getProcedimentoById(request)

    const isOnPendingChangesStatus =
      getCurrentStatus(procedimento) === 'correcoes_pendentes'

    if (!isOnPendingChangesStatus) {
      throw new BadRequestError('Cannot update in this current status')
    }

    return this.updateProcedimentoStatusToEmAnalise(procedimento.id)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.checkIfHasPrivilegesToGetProcedimento(request)
      await this.callServiceToUpdateProcedimento(request)
      const procedimento = await this.getProcedimentoWithUpdatedStatus(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
