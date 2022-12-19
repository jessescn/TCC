import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IColegiadoService } from 'services/colegiado'
import { Request, Response } from 'types/express'

export type RemoteDeleteVote = {
  autor: number
  procedimentoId: number
}

export class DeleteVoteController extends Controller<IColegiadoService> {
  constructor(service: IColegiadoService) {
    const permission: PermissionKey = 'colegiado_delete_vote'
    const mandatoryFields = ['autor', 'procedimentoId']

    super({ mandatoryFields, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { autor, procedimentoId } = request.body as RemoteDeleteVote

      const procedimento = await this.service.deleteVote(procedimentoId, autor)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
