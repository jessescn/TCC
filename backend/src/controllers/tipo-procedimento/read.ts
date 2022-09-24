import { Controller, errorResponseHandler } from 'controllers'
import { UserModel } from 'models/user'
import { TipoProcedimentoQuery } from 'repository/sequelize/tipo-procedimento'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadTipoProcedimentoController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_read'

    super({ permission, service })
  }

  getQueryByScope = (usuario: UserModel): TipoProcedimentoQuery => {
    const scope = usuario.permissoes[this.permission]

    return scope === 'owned' ? { createdBy: usuario.id } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.user)
      const tipoProcedimentos = await this.service.findAll(query)

      response.send(tipoProcedimentos)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
