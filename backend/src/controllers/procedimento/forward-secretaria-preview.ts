import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IProcedimentoService } from 'services/procedimento'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class ForwardToSecretariaPreviewController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_forward'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const respostas = await this.service.getForwardData(Number(id))

      response.json(respostas)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
