import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadTipoProcedimentoController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'tipo_procedimento_read'

    super({ permission, repository })
  }

  get repository(): TipoProcedimentoRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const tipoProcedimentos = await this.repository.findAll()

      response.send(tipoProcedimentos)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
