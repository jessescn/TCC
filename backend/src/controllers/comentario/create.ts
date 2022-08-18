import {
  checkPermissionResource,
  Controller,
  errorResponseHandler,
  validateMandatoryFields
} from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { HttpStatusCode, Request, Response } from 'types/express'

export type NewComentario = {
  conteudo: string
  procedimento: number
}

const hasPermissions = (req: Request) => {
  const permission = req.user.permissoes.comentario_create
  checkPermissionResource(permission, req)
}

const includesMandatoryFields = (req: Request) => {
  const mandatoryFields = ['conteudo', 'procedimento']
  validateMandatoryFields(mandatoryFields, req.body)
}

export class CreateComentarioController extends Controller {
  constructor() {
    const validations = [hasPermissions, includesMandatoryFields]
    super(validations)
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { conteudo, procedimento } = request.body as NewComentario

      const newComentario = await ComentarioService.create({
        conteudo,
        procedimentoId: procedimento,
        createdBy: request.user.id
      })

      response.status(HttpStatusCode.created).send(newComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
