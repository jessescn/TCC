import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

type RemoteDeleteVote = {
  autor: number
}

export class DeleteVoteController extends Controller {
  constructor() {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'colegiado_delete_vote'
    const mandatoryFields = ['autor']

    super({ validations, mandatoryFields, permission })
  }

  private callServiceToDeleteVote = async (request: Request) => {
    const { id } = request.params
    const { autor } = request.body as RemoteDeleteVote

    return ProcedimentoService.removeVote(Number(id), autor)
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
