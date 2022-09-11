import { Controller, errorResponseHandler } from 'controllers'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class HomologateProcedimentoController extends Controller {
  private repository: ProcedimentoRepository
  private request: Request

  constructor(repository: IProcedimentoRepo) {
    const permission: PermissionKey = 'procedimento_homologacao'
    const validations = [hasNumericId]

    super({ permission, validations, repository })
    this.repository = repository
  }

  private callRepoToUpdateStatus = async () => {
    const { id } = this.request.params

    return this.repository.updateStatus(Number(id), 'deferido')
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.request = request

      this.validateRequest(request)

      const procedimento = await this.callRepoToUpdateStatus()

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
