import { TipoProcedimentoModel } from 'models/tipo-procedimento'
import { ProcedimentoModel } from 'models/procedimento'
import { UserModel } from 'models/user'

export const getCurrentStatus = (procedimento: ProcedimentoModel) => {
  return procedimento.status[procedimento.status.length - 1]?.status
}

export const belongsToPublico = (
  user: UserModel,
  tipo: TipoProcedimentoModel
) => {
  return tipo.publicos.reduce((belongs, publico) => {
    if (user.publico.includes(publico)) {
      return true
    }

    return belongs || false
  }, false)
}
