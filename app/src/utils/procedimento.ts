import { ProcedimentoModel } from 'domain/models/procedimento'

export const getCurrentStatus = (procedimento: ProcedimentoModel) => {
  if (procedimento.status.length === 0) return

  return procedimento.status[procedimento.status.length - 1]?.status
}
