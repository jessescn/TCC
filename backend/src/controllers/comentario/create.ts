import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioRepository } from 'repository/sequelize/comentario'
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

  get repository(): ComentarioRepository {
    return this.props.repository
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { conteudo, procedimento } = request.body as NewComentario

      const newComentario = await this.repository.create({
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
