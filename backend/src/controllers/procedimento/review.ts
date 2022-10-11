import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { NewRevisao } from 'repository/sequelize/procedimento'
import { IProcedimentoService } from 'services/procedimento'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class ReviewProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_review'
    const validations = [hasNumericId]
    const mandatoryFields = ['aprovado', 'comentario', 'campos']

    super({
      permission,
      validations,
      mandatoryFields,
      service
    })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as NewRevisao

      const procedimento = await this.service.newReview(
        Number(id),
        request.actor,
        data
      )

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
