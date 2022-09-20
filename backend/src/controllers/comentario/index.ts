import { Controller } from 'controllers'
import { UserModel } from 'models/user'
import { ComentarioService } from 'services/comentario'
import { UnauthorizedError } from 'types/express/errors'

export abstract class ComentarioController extends Controller<ComentarioService> {
  async checkUserPermissionScope(usuario: UserModel, id: number) {
    const scope = usuario.permissoes[this.permission]

    if (scope === 'owned') {
      const comentario = await this.service.findOne(id)

      if (comentario.user.id !== usuario.id) {
        throw new UnauthorizedError()
      }
    }
  }
}
