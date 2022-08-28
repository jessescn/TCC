import {
  checkPermissionResource,
  Controller,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

type RemoteDeleteVote = {
  autor: number
}

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.colegiado_delete_vote
  checkPermissionResource(permission, req)
}

const includesMandatoryFields = (req: Request) => {
  const mandatoryFields: (keyof RemoteDeleteVote)[] = ['autor']
  validateMandatoryFields(mandatoryFields, req.body)
}

export class DeleteVoteController extends Controller {
  constructor() {
    const validations = [hasPermissions, hasNumericId, includesMandatoryFields]
    super(validations)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const { autor } = request.body as RemoteDeleteVote

      const procedimento = await ProcedimentoService.removeVote(
        Number(id),
        autor
      )

      response.json(procedimento)
    } catch (error) {
      errorResponseHandler(error, response)
    }
  }
}
