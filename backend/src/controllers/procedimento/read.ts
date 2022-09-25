import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { IProcedimentoRepo } from 'repository'
import { ProcedimentoQuery } from 'repository/sequelize/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadProcedimentoController extends Controller {
  constructor(repository: IProcedimentoRepo) {
    const permission: PermissionKey = 'procedimento_read'

    super({ permission, repository })
  }

  get repository() {
    return this.props.repository
  }

  private getOwnedProcedimentos = (request: Request) => {
    const ownedQuery: ProcedimentoQuery = { createdBy: request.user.id }
    return this.repository.findAll(ownedQuery)
  }

  private getAllProcedimentosFromSystem = () => {
    return this.repository.findAll({})
  }

  private getProcedimentosByPermissionScope = async (request: Request) => {
    const isOwnedScope = request.user.permissoes[this.permission] === 'owned'
    let procedimentos: ProcedimentoModel[]

    if (isOwnedScope) {
      procedimentos = await this.getOwnedProcedimentos(request)
    } else {
      procedimentos = await this.getAllProcedimentosFromSystem()
    }

    return procedimentos
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const procedimentos = await this.getProcedimentosByPermissionScope(
        request
      )

      response.json(procedimentos)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
