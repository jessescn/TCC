import { ProcessoModel } from 'models/processo'

export const getCurrentStatus = (procedimento: ProcessoModel) => {
  return procedimento.status[procedimento.status.length - 1]?.status
}
