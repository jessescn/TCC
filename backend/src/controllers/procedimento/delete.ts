import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { UnauthorizedError } from 'types/express/errors'
import { hasNumericId } from 'validations/request'

export class DeleteProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'procedimento_delete'
    const validations = [hasNumericId]

    super({ permission, validations })
  }

  private checkIfHasPermissionToDelete = async (request: Request) => {
    const { id } = request.params
    const procedimento = await ProcedimentoService.getById(Number(id))

    const scope = request.user.permissoes[this.permission]
    const isOwnedScope = scope === 'owned'
    const isAllScope = scope === 'all'
    const isAuthor = procedimento.createdBy === request.user.id
    const hasPermissionToDelete = isAllScope || (isOwnedScope && isAuthor)

    if (!hasPermissionToDelete) {
      throw new UnauthorizedError()
    }
  }

  private callServiceToDeleteProcedimento = (request: Request) => {
    const { id } = request.params
    return ProcedimentoService.destroy(Number(id))
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)
      await this.checkIfHasPermissionToDelete(request)
      const procedimento = await this.callServiceToDeleteProcedimento(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
