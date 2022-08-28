import {
  checkPermissionResource,
  Controller,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { VotoProcedimento } from 'models/procedimento'
import { ProcedimentoService } from 'services/entities/procedimento-service'
import { HttpStatusCode, Request, Response } from 'types/express'
import { hasNumericId } from 'validations/request'

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.colegiado_vote
  checkPermissionResource(permission, req)
}

const includesMandatoryFields = (req: Request) => {
  const mandatoryFields: (keyof VotoProcedimento)[] = ['autor', 'aprovado']
  validateMandatoryFields(mandatoryFields, req.body)
}

export class VoteController extends Controller {
  constructor() {
    const validations = [hasPermissions, hasNumericId, includesMandatoryFields]
    super(validations)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params
      const data = request.body as VotoProcedimento

      const procedimento = await ProcedimentoService.vote(Number(id), {
        aprovado: data.aprovado,
        autor: data.autor,
        data: data.data
      })

      response.status(HttpStatusCode.created).send(procedimento)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
