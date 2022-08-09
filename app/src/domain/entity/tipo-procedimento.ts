import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'

export class TipoProcedimento {
  static getTipoProcedimentosAbertos(
    tipoProcedimentos: TipoProcedimentoModel[]
  ) {
    const tipoProcedimentosAtivos = tipoProcedimentos.filter(
      tipo => tipo.status === 'ativo'
    )

    const dataAtual = new Date()

    const procedimentosAbertos = tipoProcedimentosAtivos.filter(tipo => {
      const dataInicio = tipo.dataInicio ? new Date(tipo.dataInicio) : null
      const dataFim = tipo.dataFim ? new Date(tipo.dataFim) : null

      const isAberto = !dataInicio || dataInicio < dataAtual
      const isFechado = dataFim && dataFim < dataAtual

      return isAberto && !isFechado
    })

    return procedimentosAbertos
  }
}
