import { Controller, errorResponseHandler } from 'controllers'
import { VotoProcedimento } from 'models/procedimento'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoRepository } from 'repository/sequelize/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { hasNumericId } from 'utils/validations/request'

export class UpdateVoteController extends Controller {
  private repository: ProcedimentoRepository

  constructor(repository: IProcedimentoRepo) {
    const mandatoryFields: (keyof VotoProcedimento)[] = ['autor', 'aprovado']
    const permission: PermissionKey = 'colegiado_vote'
    const validations = [hasNumericId]

    super({ validations, permission, mandatoryFields, repository })
    this.repository = repository
  }

  private callServiceToUpdateVote = (request: Request) => {
    const { id } = request.params
    const data = request.body as VotoProcedimento

    return this.repository.updateVote(Number(id), {
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
