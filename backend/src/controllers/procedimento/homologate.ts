import { Controller, errorResponseHandler } from 'controllers'
import { IColegiadoService } from 'services/colegiado'
import { PermissionKey } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class HomologateProcedimentoController extends Controller<IColegiadoService> {
  constructor(service: IColegiadoService) {
    const permission: PermissionKey = 'procedimento_homologacao'
    const validations = [hasNumericId]

    super({ permission, validations, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const procedimento = await this.service.homologate(Number(id))

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
