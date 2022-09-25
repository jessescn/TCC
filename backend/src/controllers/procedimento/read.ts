import { Controller, errorResponseHandler } from 'controllers'
import { UserModel } from 'domain/models/user'
import { IProcedimentoService } from 'services/procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_read'

    super({ permission, service })
  }

  private getQueryByScope(usuario: UserModel) {
    const scope = usuario.permissoes[this.permission]

    return scope === 'owned' ? { createdBy: usuario.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.user)
      const procedimentos = await this.service.findAll(query)

      response.json(procedimentos)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
