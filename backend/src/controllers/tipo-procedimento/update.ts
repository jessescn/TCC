import { Controller, errorResponseHandler } from 'controllers'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { PermissionKey } from 'domain/profiles'
import { ITipoProcedimentoService } from 'services/tipo-procedimento'
import { Request, Response } from 'types/express'
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
    'revisao_coordenacao',
    'colegiado'
  ]
  notIncludesInvalidFields(req, validFields)
}

export class UpdateTipoProcedimentoController extends Controller<ITipoProcedimentoService> {
  constructor(service: ITipoProcedimentoService) {
    const permission: PermissionKey = 'tipo_procedimento_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<TipoProcedimentoModel>

      const updatedTipoProcedimento = await this.service.update(
        Number(id),
        data
      )

      response.json(updatedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
