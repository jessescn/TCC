import {
  NewRevisao,
  ProcedimentoService
} from 'services/entities/procedimento-service'
import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'
import { Revisao } from 'models/procedimento'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'

export class ReviewProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'procedimento_review'
    const validations = [hasNumericId]
    const mandatoryFields: (keyof NewRevisao)[] = [
      'aprovado',
      'comentario',
      'campos'
    ]

    super({ permission, validations, mandatoryFields })
  }

  private getUpdatedProcedimento = async (request: Request) => {
    const { id } = request.params
    return ProcedimentoService.getById(Number(id))
  }

  private updateStatusToPendingChanges = async (request: Request) => {
    const { id } = request.params
    await ProcedimentoService.updateStatus(Number(id), 'correcoes_pendentes')
  }

  private updateStatusToHomologation = async (request: Request) => {
    const { id } = request.params
    await ProcedimentoService.updateStatus(Number(id), 'em_homologacao')
  }

  private updateStatusToDeferred = async (request: Request) => {
    const { id } = request.params
    await ProcedimentoService.updateStatus(Number(id), 'deferido')
  }

  private updateProcedimentoToNextStatus = async (request: Request) => {
    const data = request.body as NewRevisao

    const hasPendingChanges = !data.aprovado

    if (hasPendingChanges) {
      return this.updateStatusToPendingChanges(request)
    }

    const procedimento = await this.getUpdatedProcedimento(request)
    const tipo = await TipoProcedimentoService.getById(procedimento.tipo)

    const shouldForwardToColegiado = tipo.colegiado

    if (shouldForwardToColegiado) {
      return this.updateStatusToHomologation(request)
    } else {
      return this.updateStatusToDeferred(request)
    }
  }

  private callServiceToAddNewRevisao = async (request: Request) => {
    const { id } = request.params
    const data = request.body as NewRevisao

    const revisao: Revisao = {
      ...data,
      data: new Date().toISOString(),
      autor: request.user
    }

    await ProcedimentoService.newRevisao(Number(id), revisao)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)
      await this.callServiceToAddNewRevisao(request)
      await this.updateProcedimentoToNextStatus(request)
      const procedimento = await this.getUpdatedProcedimento(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
