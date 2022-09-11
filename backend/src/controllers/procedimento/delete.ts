import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoAttributes } from 'models/procedimento'
import { IProcedimentoRepo } from 'repository'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError, UnauthorizedError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

export class DeleteProcedimentoController extends Controller {
  constructor(repository: IProcedimentoRepo) {
    const permission: PermissionKey = 'procedimento_delete'
    const validations = [hasNumericId]

    super({ permission, validations, repository })
  }

  get repository() {
    return this.props.repository
  }

  private checkIfHasPermissionToDelete = (
    procedimento: ProcedimentoAttributes,
    request: Request
  ) => {
    const scope = request.user.permissoes[this.permission]
    const isOwnedScope = scope === 'owned'
    const isAllScope = scope === 'all'
    const isAuthor = procedimento.createdBy === request.user.id
    const hasPermissionToDelete = isAllScope || (isOwnedScope && isAuthor)

    if (!hasPermissionToDelete) {
      throw new UnauthorizedError()
    }
  }

  private checkIfProcedimentoExists = (
    procedimento: ProcedimentoAttributes
  ) => {
    if (!procedimento) {
      throw new NotFoundError()
    }
  }

  private validateIfProcedimentoCanBeDeleted = async (request: Request) => {
    const { id } = request.params

    const procedimento = await this.repository.findOne(Number(id))

    this.checkIfProcedimentoExists(procedimento)
    this.checkIfHasPermissionToDelete(procedimento, request)
  }

  private callRepoToDeleteProcedimento = (request: Request) => {
    const { id } = request.params
    return this.repository.destroy(Number(id))
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.validateIfProcedimentoCanBeDeleted(request)

      const procedimento = await this.callRepoToDeleteProcedimento(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
