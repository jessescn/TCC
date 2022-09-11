import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { hasNumericId } from 'utils/request'

export class ReadOneTipoProcedimentoController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'tipo_procedimento_read'
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

      const tipoProcedimento = await this.repository.findOne(Number(id))

      if (!tipoProcedimento) {
        throw new NotFoundError()
      }

      response.json(tipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
