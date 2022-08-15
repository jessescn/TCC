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

export const validators = {
  hasPermissions: (req: Request) => {
    const permission = req.user.permissoes.comentario_create
    checkPermissionResource(permission, req)
  },
  includesMandatoryFields: (req: Request) => {
    const mandatoryFields = ['conteudo', 'procedimento']
    validateMandatoryFields(mandatoryFields, req.body)
  }
}

export function CreateComentarioController(): Controller {
  const validateRequest = (req: Request) => {
    validators.hasPermissions(req)
    validators.includesMandatoryFields(req)
  }

  return {
    exec: async (request: Request, response: Response) => {
      try {
        validateRequest(request)

        const { conteudo, procedimento } = request.body as NewComentario

        const newComentario = await ComentarioService.create({
          conteudo,
          procedimentoId: procedimento,
          createdBy: request.user.id
        })

        response.status(HttpStatusCode.created).send(newComentario)
      } catch (error) {
        console.log({ error })

        errorResponseHandler(response, error)
      }
    }
  }
}
