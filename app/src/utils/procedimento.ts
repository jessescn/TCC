import { ProcedimentoModel } from 'domain/models/procedimento'

export const getCurrentStatus = (procedimento: ProcedimentoModel) => {
  return procedimento.status[procedimento.status.length - 1]?.status
}
