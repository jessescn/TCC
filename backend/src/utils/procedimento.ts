import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { UserModel } from 'domain/models/user'

export const getCurrentStatus = (procedimento: ProcedimentoModel) => {
  return procedimento.status[procedimento.status.length - 1]?.status
}

export const belongsToPublico = (
  user: UserModel,
  tipo: TipoProcedimentoModel
) => {
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
