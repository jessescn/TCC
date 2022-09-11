import { errorResponseHandler } from 'controllers'
import { IProcedimentoRepo } from 'repository'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { VoteController } from '.'

type RemoteDeleteVote = {
  autor: number
}

export class DeleteVoteController extends VoteController {
  constructor(repository: IProcedimentoRepo) {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'colegiado_delete_vote'
    const mandatoryFields = ['autor']

    super({ validations, mandatoryFields, permission, repository })
    this.repository = repository
  }

  private callRepoToDeleteVote = async (request: Request) => {
    const { id } = request.params
    const { autor } = request.body as RemoteDeleteVote

    return this.repository.removeVote(Number(id), autor)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.checkIfProcedimentoCanUpdate(request)

      const procedimento = await this.callRepoToDeleteVote(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
