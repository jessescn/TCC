import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoModel } from 'models/procedimento'
import { IProcedimentoRepo } from 'repository'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { UnauthorizedError } from 'types/express/errors'
import { hasNumericId } from 'utils/validations/request'

export class ReadOneProcedimentoController extends Controller {
  constructor(repository: IProcedimentoRepo) {
    const permission: PermissionKey = 'procedimento_read'
    const validations = [hasNumericId]

    super({ validations, permission, repository })
  }

  get repository() {
    return this.props.repository
  }

  private checkIfHasPrivilegesToGetProcedimento = (
    request: Request,
    procedimento: ProcedimentoModel
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

  private callServiceToGetProcedimentoById = async (request: Request) => {
    const { id } = request.params

    const procedimento = await this.repository.findOne(Number(id))

    this.checkIfHasPrivilegesToGetProcedimento(request, procedimento)

    return procedimento
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const procedimento = await this.callServiceToGetProcedimentoById(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
