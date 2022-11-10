import { Controller, errorResponseHandler } from 'controllers'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { PermissionKey } from 'domain/profiles'
import { IProcedimentoService } from 'services/procedimento'
import { Request, Response } from 'types/express'
import { hasNumericId, notIncludesInvalidFields } from 'utils/request'

const notIncludesInvalidUpdateFields = (req: Request) => {
  const validFields: (keyof ProcedimentoModel)[] = [
    'revisoes',
    'respostas',
    'votos'
  ]
  notIncludesInvalidFields(req, validFields)
}

export class UpdateProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_update'
    const validations = [hasNumericId, notIncludesInvalidUpdateFields]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as Partial<ProcedimentoModel>

      const procedimento = await this.service.update(Number(id), data)

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
