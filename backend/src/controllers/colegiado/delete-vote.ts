import { Controller, errorResponseHandler } from 'controllers'
import { IColegiadoService } from 'services/colegiado'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

type RemoteDeleteVote = {
  autor: number
}

export class DeleteVoteController extends Controller<IColegiadoService> {
  constructor(service: IColegiadoService) {
    const validations = [hasNumericId]
    const permission: PermissionKey = 'colegiado_delete_vote'
    const mandatoryFields = ['autor']

    super({ validations, mandatoryFields, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const { autor } = request.body as RemoteDeleteVote

      const procedimento = await this.service.deleteVote(Number(id), autor)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
