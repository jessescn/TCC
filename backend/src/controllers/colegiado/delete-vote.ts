import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

type RemoteDeleteVote = {
  autor: number
}

export class DeleteVoteController extends Controller {
  constructor() {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'colegiado_delete_vote'
    const mandatoryFields = ['autor']

    super({ validations, mandatoryFields, permission })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const { autor } = request.body as RemoteDeleteVote

      const procedimento = await ProcedimentoService.removeVote(
        Number(id),
        autor
      )

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
