import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoAttributes } from 'domain/models/procedimento'
import { IProcedimentoRepo, IRepository } from 'repository'
import { CreateProcedimento } from 'repository/sequelize/procedimento'
import { ProcedimentoStatusService } from 'services/procedimento-status'
import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { BadRequestError, UnauthorizedError } from 'types/express/errors'
import { belongsToPublico } from 'utils/procedimento'

export class CreateProcedimentoController extends Controller {
  private tipoProcedimentoRepo: IRepository
  private usuarioRepo: IRepository

  constructor(
    repository: IProcedimentoRepo,
    tipoProcedimentoRepo: IRepository,
    usuarioRepo: IRepository
  ) {
    const mandatoryFields: (keyof CreateProcedimento)[] = ['tipo', 'respostas']
    const permission: PermissionKey = 'procedimento_create'

    super({ permission, mandatoryFields, repository })
    this.tipoProcedimentoRepo = tipoProcedimentoRepo
    this.usuarioRepo = usuarioRepo
  }

  get repository() {
    return this.props.repository
  }

  private checkIfTipoProcedimentoExists = async (request: Request) => {
    const { tipo } = request.body as CreateProcedimento

    const tipoProcedimento = await this.tipoProcedimentoRepo.findOne(tipo)

    if (!tipoProcedimento) {
      throw new BadRequestError('tipo procedimento not found')
    }
  }

  private checkIfUserBelongsToPublico = async (request: Request) => {
    const { createdBy, tipo } = request.body as CreateProcedimento

    const usuario = await this.usuarioRepo.findOne(createdBy)
    const tipoProcedimento = await this.tipoProcedimentoRepo.findOne(tipo)

    if (!usuario) {
      throw new BadRequestError('createdBy not found')
    }

    if (!belongsToPublico(usuario, tipoProcedimento)) {
      throw new UnauthorizedError(
        'Does not have permission to this procedimento'
      )
    }
  }

  private validateIfProcedimentoCanBeCreated = async (request: Request) => {
    await this.checkIfTipoProcedimentoExists(request)
    await this.checkIfUserBelongsToPublico(request)
  }

  private updateCreatedProcedimentoStatus = async (
    createdProcedimento: ProcedimentoAttributes
  ) => {
    const procedimento =
      await ProcedimentoStatusService.changeProcedimentoStatus(
        createdProcedimento,
        'em_analise'
      )

    return procedimento
  }

  private callRepoToCreateProcedimento = (request: Request) => {
    const data = request.body as CreateProcedimento

    return this.repository.create({
      respostas: data.respostas,
      tipo: data.tipo,
      createdBy: request.user.id,
      votos: []
    })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      await this.validateIfProcedimentoCanBeCreated(request)

      const created = await this.callRepoToCreateProcedimento(request)

      const procedimento = await this.updateCreatedProcedimentoStatus(created)

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
