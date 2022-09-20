import { errorResponseHandler } from 'controllers'
import { UserModel } from 'models/user'
import { ComentarioQuery } from 'repository/sequelize/comentario'
import { ComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { ComentarioController } from '.'

export class ReadComentarioController extends ComentarioController {
  constructor(service: ComentarioService) {
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

      response.send(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
