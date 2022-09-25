import { Controller, errorResponseHandler } from 'controllers'
import { NewRevisao } from 'repository/sequelize/procedimento'
import { IProcedimentoService } from 'services/procedimento'
import { PermissionKey } from 'types/auth/actors'
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
        request.user,
        data
      )

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
