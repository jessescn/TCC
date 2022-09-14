import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'

export type NewComentario = {
  conteudo: string
  procedimento: number
}

export class CreateComentarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'comentario_create'
    const mandatoryFields: (keyof NewComentario)[] = [
      'conteudo',
      'procedimento'
    ]

    super({ mandatoryFields, permission, repository })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const data = request.body as NewComentario

      const newComentario = await ComentarioService.create(request.user, data)

      response.status(HttpStatusCode.created).send(newComentario)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
