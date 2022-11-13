import { ProcedimentoModel } from 'domain/models/procedimento'

export const getCurrentStatus = (procedimento: ProcedimentoModel) => {
  if (procedimento.status.length === 0) return

  return procedimento.status[procedimento.status.length - 1]?.status
}

export const loadFields = (procedimento: ProcedimentoModel) =>
  procedimento.respostas.reduce((current, resposta) => {
    const fields = resposta.campos.reduce((curr, campo) => {
      return { ...curr, [`field${campo.ordem}`]: campo }
    }, {}) as any

    return { ...current, ...fields }
  }, {})
