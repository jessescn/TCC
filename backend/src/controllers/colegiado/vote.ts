import { Controller, errorResponseHandler } from 'controllers'
import { VotoProcedimento } from 'models/procedimento'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

export class VoteController extends Controller {
  constructor() {
    const mandatoryFields: (keyof VotoProcedimento)[] = ['autor', 'aprovado']
    const permission: keyof PermissionKeys = 'colegiado_vote'

    const validations = [hasNumericId]
    super({ validations, permission, mandatoryFields })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as VotoProcedimento

      const procedimento = await ProcedimentoService.vote(Number(id), {
        aprovado: data.aprovado,
        autor: data.autor,
        data: data.data
      })

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
