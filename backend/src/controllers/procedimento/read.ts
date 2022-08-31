import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoModel } from 'models/procedimento'
import {
  ProcedimentoQuery,
  ProcedimentoService
} from 'services/entities/procedimento-service'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadProcedimentoController extends Controller {
  constructor() {
    const permission: PermissionKey = 'procedimento_read'

    super({ permission })
  }

  private getOwnedProcedimentos = (request: Request) => {
    const ownedQuery: ProcedimentoQuery = { createdBy: request.user.id }
    return ProcedimentoService.getAll(ownedQuery)
  }

  private getAllProcedimentosFromSystem = () => {
    return ProcedimentoService.getAll()
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
