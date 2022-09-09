import { Controller, errorResponseHandler } from 'controllers'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/validations/request'

export class HomologateProcedimentoController extends Controller {
  private repository: ProcedimentoRepository

  constructor(repository: IProcedimentoRepo) {
    const permission: PermissionKey = 'procedimento_homologacao'
    const validations = [hasNumericId]

    super({ permission, validations, repository })
    this.repository = repository
  }

  private getProcedimentoWithUpdatedStatus = (request: Request) => {
    const { id } = request.params
    return this.repository.findOne(Number(id))
  }

  private callServiceToUpdateStatus = async (request: Request) => {
    const { id } = request.params

    await this.repository.updateStatus(Number(id), 'deferido')
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
