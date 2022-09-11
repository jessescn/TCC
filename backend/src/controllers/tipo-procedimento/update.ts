import { Controller, errorResponseHandler } from 'controllers'
import { TipoProcedimentoModel } from 'models/tipo-procedimento'
import { IRepository } from 'repository'
import { TipoProcedimentoRepository } from 'repository/sequelize/tipo-procedimento'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { NotFoundError } from 'types/express/errors'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

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

  checkIfTipoProcedimentoExists = async (id: number) => {
    const tipoProcedimento = await this.repository.findOne(id)

    if (!tipoProcedimento) {
      throw new NotFoundError()
    }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<TipoProcedimentoModel>

      await this.checkIfTipoProcedimentoExists(Number(id))

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
