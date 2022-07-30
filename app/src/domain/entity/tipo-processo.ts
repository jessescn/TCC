import { TipoProcessoModel } from 'domain/models/tipo-processo'

export class TipoProcesso {
  static getTipoProcessosAbertos(tipoProcessos: TipoProcessoModel[]) {
    const tipoProcessosAtivos = tipoProcessos.filter(
      tipo => tipo.status === 'ativo'
    )

    const dataAtual = new Date()

    const processosAbertos = tipoProcessosAtivos.filter(tipo => {
      const dataInicio = tipo.dataInicio ? new Date(tipo.dataInicio) : null
      const dataFim = tipo.dataFim ? new Date(tipo.dataFim) : null

      const isAberto = !dataInicio || dataInicio < dataAtual
      const isFechado = dataFim && dataFim < dataAtual

      return isAberto && !isFechado
    })

    return processosAbertos
  }
}
