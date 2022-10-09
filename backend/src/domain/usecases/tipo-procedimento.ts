import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ActorModel } from 'domain/models/actor'

export class TipoProcedimentoUseCase {
  static belongsToPublico = (
    actor: ActorModel,
    tipo: TipoProcedimentoModel
  ) => {
    if (tipo.publicos.length === 0) {
      return true
    }

    return tipo.publicos.reduce((belongs, publico) => {
      if (actor.publico.includes(publico)) {
        return true
      }

      return belongs || false
    }, false)
  }
}
