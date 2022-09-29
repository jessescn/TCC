import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { UserModel } from 'domain/models/user'

export class TipoProcedimentoUseCase {
  static belongsToPublico = (user: UserModel, tipo: TipoProcedimentoModel) => {
    if (tipo.publicos.length === 0) {
      return true
    }

    return tipo.publicos.reduce((belongs, publico) => {
      if (user.publico.includes(publico)) {
        return true
      }

      return belongs || false
    }, false)
  }
}
