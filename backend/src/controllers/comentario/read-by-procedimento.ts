import { errorResponseHandler } from 'controllers'
import { UserModel } from 'domain/models/user'
import { ComentarioQuery } from 'repository/sequelize/comentario'
import { IComentarioService } from 'services/comentario'
import { PermissionKeys } from 'types/auth/actors'
import { Request, Response } from 'types/express'
import { hasNumericId } from 'utils/request'
import { ComentarioController } from '.'

export class ReadCommentsByProcedimentoController extends ComentarioController {
  constructor(service: IComentarioService) {
    const validations = [hasNumericId]
    const permission: keyof PermissionKeys = 'colegiado_comments'

    super({ permission, validations, service })
  }

  getQueryByScope(usuario: UserModel, procedimentoId: number): ComentarioQuery {
    const scope = usuario.permissoes[this.permission]

    return scope === 'owned'
      ? { user: { id: usuario.id }, procedimentoId }
      : { procedimentoId }
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.validateRequest(request)

      const { id } = request.params

      const query = this.getQueryByScope(request.user, Number(id))

      const comentarios = await this.service.findAll(query)

      response.json(comentarios)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
