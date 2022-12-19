import { Controller, errorResponseHandler } from 'controllers'
import { PermissionKey } from 'domain/profiles'
import { CreateVoto, NewVoto } from 'repositories/sequelize/voto'
import { IColegiadoService } from 'services/colegiado'
import { Request, Response } from 'types/express'

export class UpdateVoteController extends Controller<IColegiadoService> {
  constructor(service: IColegiadoService) {
    const mandatoryFields: (keyof CreateVoto)[] = ['aprovado', 'procedimentoId']
    const permission: PermissionKey = 'colegiado_update_vote'

    super({ permission, mandatoryFields, service })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewVoto

      const procedimento = await this.service.vote({
        ...data,
        autorId: request.actor?.id
      })

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
