import { Controller, errorResponseHandler } from 'controllers'
import { ComentarioService } from 'services/entities/comentario-service'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export type NewComentario = {
  conteudo: string
  procedimento: number
}

export class CreateComentarioController extends Controller {
  constructor() {
    const permission: keyof PermissionKeys = 'comentario_create'
    const mandatoryFields: (keyof NewComentario)[] = [
      'conteudo',
      'procedimento'
    ]

    super({ mandatoryFields, permission })
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
