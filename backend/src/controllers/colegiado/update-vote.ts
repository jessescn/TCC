import { errorResponseHandler } from 'controllers'
import {
  ProcedimentoAttributes,
  TStatus,
  VotoProcedimento
} from 'domain/models/procedimento'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoStatusService } from 'services/procedimento-status'
import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { ProcedimentoUseCase } from 'domain/usecases/procedimento'
import { hasNumericId } from 'utils/request'
import { VoteController } from '.'

export class UpdateVoteController extends VoteController {
  constructor(repository: IProcedimentoRepo) {
    const mandatoryFields: (keyof VotoProcedimento)[] = ['autor', 'aprovado']
    const permission: PermissionKey = 'colegiado_vote'
    const validations = [hasNumericId]

    super({ validations, permission, mandatoryFields, repository })
    this.repository = repository
  }

  private handleMajorityVotes = async (
    procedimento: ProcedimentoAttributes
  ) => {
    const novoStatus: TStatus =
      ProcedimentoStatusService.isProcedimentoAprovado(procedimento.votos)
        ? 'deferido'
        : 'indeferido'

    return ProcedimentoStatusService.changeProcedimentoStatus(
      procedimento,
      novoStatus
    )
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

      await this.checkIfProcedimentoCanUpdate(request)

      const procedimento = await this.callServiceToUpdateVote(request)

      const isMaioriaVotos = ProcedimentoUseCase.isMaioria(procedimento.votos)

      if (isMaioriaVotos) {
        const updatedProcedimento = await this.handleMajorityVotes(procedimento)

        response.status(HttpStatusCode.created).send(updatedProcedimento)
        return
      }

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
