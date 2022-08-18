import {
  checkPermissionResource,
  Controller,
  errorResponseHandler
} from 'controllers'
import { TipoProcedimentoService } from 'services/entities/tipo-procedimento-service'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'validations/request'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.tipo_procedimento_update
  checkPermissionResource(permission, req)
}

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields = [
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
  constructor() {
    const validations = [
      hasPermissions,
      hasNumericId,
      notIncludesInvalidUpdateFields
    ]
    super(validations)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body

      const updatedTipoProcedimento = await TipoProcedimentoService.update(
        Number(id),
        data
      )

      response.json(updatedTipoProcedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
