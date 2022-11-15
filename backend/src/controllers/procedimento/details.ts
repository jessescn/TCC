import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { IProcedimentoService } from 'services/procedimento'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'

export class GetDetailsProcedimentoController extends Controller<IProcedimentoService> {
  constructor(service: IProcedimentoService) {
    const permission: PermissionKey = 'procedimento_read'
    const validations = [hasNumericId]

    super({ validations, permission, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const actorRole = request.actor.profile.nome
      const canSeeComments = actorRole === 'admin' || actorRole === 'colegiado'

      const result = await this.service.details(Number(id))

      const data = {
        ...result,
        comentarios: canSeeComments ? result.comentarios : []
      }

      response.json(data)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
