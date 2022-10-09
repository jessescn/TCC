import { Controller, errorResponseHandler } from 'controllers'
import { VotoProcedimento } from 'domain/models/procedimento'
import { IColegiadoService } from 'services/colegiado'
import { PermissionKey } from 'domain/profiles'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class UpdateVoteController extends Controller<IColegiadoService> {
  constructor(service: IColegiadoService) {
    const mandatoryFields: (keyof VotoProcedimento)[] = ['autor', 'aprovado']
    const permission: PermissionKey = 'colegiado_update_vote'
    const validations = [hasNumericId]

    super({ validations, permission, mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as VotoProcedimento

      const procedimento = await this.service.updateVote(Number(id), data)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
