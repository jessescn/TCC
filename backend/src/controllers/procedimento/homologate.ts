import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IColegiadoService } from 'services/colegiado'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class HomologateProcedimentoController extends Controller<IColegiadoService> {
  constructor(service: IColegiadoService) {
    const permission: PermissionKey = 'procedimento_homologate'
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
      errorResponseHandler(response, error)
    }
  }
}
