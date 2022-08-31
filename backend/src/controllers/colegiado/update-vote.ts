import { Controller, errorResponseHandler } from 'controllers'
import { VotoProcedimento } from 'models/procedimento'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class UpdateVoteController extends Controller {
  constructor() {
    const mandatoryFields: (keyof VotoProcedimento)[] = ['autor', 'aprovado']
    const permission: PermissionKey = 'colegiado_vote'
    const validations = [hasNumericId]

    super({ validations, permission, mandatoryFields })
  }

  private callServiceToUpdateVote = (request: Request) => {
    const { id } = request.params
    const data = request.body as VotoProcedimento

    return ProcedimentoService.updateVote(Number(id), {
      aprovado: data.aprovado,
      autor: data.autor,
      data: data.data
    })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const procedimento = await this.callServiceToUpdateVote(request)

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
