import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { FetchData } from 'services/tipo-procedimentos'

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

  static convertFetchDataIntoGraphData(data: FetchData[]) {
    const parsedBars = data.reduce((bars, elm) => {
      const keys = Object.keys(elm.values)

      keys.forEach(key => {
        const keyValues = elm.values[key]
        const current = bars[key] || []

        bars[key] = [...current, ...keyValues]
      })

      return bars
    }, {} as Record<string, string[]>)

    const toRender = Object.keys(parsedBars).map(bar => {
      const values = parsedBars[bar].reduce((current, value) => {
        const count = current[value] || 0

        current[value] = count + 1

        return current
      }, {} as Record<string, number>)

      return {
        name: bar,
        ...values
      }
    })

    const bars = toRender.reduce((current, element) => {
      return [...current, ...Object.keys(element)]
    }, [] as string[])

    const uniqueBars = [...new Set(bars)].filter(e => e !== 'name')

    return {
      parsedData: toRender,
      bars: uniqueBars
    }
  }
}
