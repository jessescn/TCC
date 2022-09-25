import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { Revisao } from 'domain/models/procedimento'
import { IProcedimentoRepo, IRepository } from 'repository'
import {
  NewRevisao,
  ProcedimentoRepository
} from 'repository/sequelize/procedimento'
import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { NotFoundError } from 'types/express/errors'

export class ReviewProcedimentoController extends Controller {
  private repository: ProcedimentoRepository
  private tipoProcedimentoRepo: TipoProcedimentoRepository

  constructor(
    procedimentoRepo: IProcedimentoRepo,
    tipoProcedimentoRepo: IRepository
  ) {
    const permission: PermissionKey = 'procedimento_review'
    const validations = [hasNumericId]
    const mandatoryFields = ['aprovado', 'comentario', 'campos']

    super({
      permission,
      validations,
      mandatoryFields,
      repository: procedimentoRepo
    })
    this.repository = procedimentoRepo
    this.tipoProcedimentoRepo = tipoProcedimentoRepo
  }

  private checkIfProcedimentoExists = async (request: Request) => {
    const { id } = request.params
    const procedimento = await this.repository.findOne(Number(id))

    if (!procedimento) {
      throw new NotFoundError()
    }
  }

  private getUpdatedProcedimento = async (request: Request) => {
    const { id } = request.params
    return this.repository.findOne(Number(id))
  }

  private updateStatusToPendingChanges = async (request: Request) => {
    const { id } = request.params
    await this.repository.updateStatus(Number(id), 'correcoes_pendentes')
  }

  private updateStatusToHomologation = async (request: Request) => {
    const { id } = request.params
    await this.repository.updateStatus(Number(id), 'em_homologacao')
  }

  private updateStatusToDeferred = async (request: Request) => {
    const { id } = request.params
    await this.repository.updateStatus(Number(id), 'deferido')
  }

  private updateProcedimentoToNextStatus = async (request: Request) => {
    const data = request.body as NewRevisao

    const hasPendingChanges = !data.aprovado

    if (hasPendingChanges) {
      return this.updateStatusToPendingChanges(request)
    }

    const procedimento = await this.getUpdatedProcedimento(request)
    const tipo = await this.tipoProcedimentoRepo.findOne(procedimento.tipo)

    const shouldForwardToColegiado = tipo.colegiado

    if (shouldForwardToColegiado) {
      return this.updateStatusToHomologation(request)
    } else {
      return this.updateStatusToDeferred(request)
    }
  }

  private callRepoToAddNewRevisao = async (request: Request) => {
    const { id } = request.params
    const data = request.body as NewRevisao

    const revisao: Revisao = {
      ...data,
      data: new Date().toISOString(),
      autor: request.user
    }

    await this.repository.newRevisao(Number(id), revisao)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.checkIfProcedimentoExists(request)
      await this.callRepoToAddNewRevisao(request)
      await this.updateProcedimentoToNextStatus(request)

      const procedimento = await this.getUpdatedProcedimento(request)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
