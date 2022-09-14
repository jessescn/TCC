import { Controller, errorResponseHandler } from 'controllers'
import { IRepository } from 'repository'
import { ComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'

export class ReadComentarioController extends Controller {
  constructor(repository: IRepository) {
    const permission: keyof PermissionKeys = 'comentario_delete'

    super({ permission, repository })
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const comentarios = await ComentarioService.findAll()

      response.send(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
