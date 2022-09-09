import { Controller, errorResponseHandler } from 'controllers'
import { TipoProcedimentoModel } from 'models/tipo-procedimento'
import { IRepository } from 'repository'
import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import {
  hasNumericId,
  notIncludesInvalidFields
} from 'utils/validations/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields: (keyof TipoProcedimentoModel)[] = [
    'nome',
    'descricao',
    'status',
    'dataFim',
    'dataInicio',
    'escopo',
    'formularios',
    'publicos',
    'colegiado'
  ]
  notIncludesInvalidFields(req, validFields)
}

export class UpdateTipoProcedimentoController extends Controller {
  constructor(repository: IRepository) {
    const permission: PermissionKey = 'tipo_procedimento_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ validations, permission, repository })
  }

  get repository(): TipoProcedimentoRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<TipoProcedimentoModel>

      const updatedTipoProcedimento = await this.repository.update(
        Number(id),
        data
      )

      response.json(updatedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
