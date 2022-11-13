import {
  Controller,
  errorResponseHandler,
  extractPagination
} from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IProcedimentoService } from 'services/procedimento'
import { Request, Response } from 'types/express'

export class ReadEmHomologacaoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'colegiado_read'

    super({ permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const pagination = extractPagination(request)

      const result = await this.service.findAllByStatus(
        'em_homologacao',
        pagination
      )

      response.json(result)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
