import { errorResponseHandler } from 'controllers'
import { UserModel } from 'domain/models/user'
import { ComentarioQuery } from 'repository/sequelize/comentario'
import { IComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { ComentarioController } from '.'

export class ReadComentarioController extends ComentarioController {
  constructor(service: IComentarioService) {
    const permission: keyof PermissionKeys = 'comentario_delete'

    super({ permission, service })
  }

  getQueryByScope(usuario: UserModel): ComentarioQuery {
    const scope = usuario.permissoes[this.permission]

    return scope === 'owned' ? { user: { id: usuario.id } } : {}
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const query = this.getQueryByScope(request.user)
      const comentarios = await this.service.findAll(query)

      response.json(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
