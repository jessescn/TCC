import { Controller, errorResponseHandler } from 'controllers'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/validations/request'

type RemoteDeleteVote = {
  autor: number
}

export class DeleteVoteController extends Controller {
  private repository: ProcedimentoRepository

  constructor(repository: IProcedimentoRepo) {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'colegiado_delete_vote'
    const mandatoryFields = ['autor']

    super({ validations, mandatoryFields, permission, repository })
    this.repository = repository
  }

  private callServiceToDeleteVote = async (request: Request) => {
    const { id } = request.params
    const { autor } = request.body as RemoteDeleteVote

    return this.repository.removeVote(Number(id), autor)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const procedimento = await this.callServiceToDeleteVote(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
