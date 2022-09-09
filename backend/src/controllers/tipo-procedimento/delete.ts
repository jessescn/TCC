import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/validations/request'

export class DeleteTipoProcedimentoController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'tipo_procedimento_update'
    const validations = [hasNumericId]

    super({ validations, permission, repository })
  }

  get repository(): TipoProcedimentoRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const deletedTipoProcedimento = await this.repository.destroy(Number(id))

      response.json(deletedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
