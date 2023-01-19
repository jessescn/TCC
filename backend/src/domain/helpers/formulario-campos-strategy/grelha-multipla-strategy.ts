import { CampoFormulario } from 'domain/models/formulario'
import { RespostaCampo } from 'domain/models/procedimento'
import { CampoTipoBase, StrategyHandler } from '.'

type CampoGrelhaMultipla = CampoTipoBase & {
  opcoes: {
    linhas: string[]
    colunas: string[]
  }
}

export class GrelhaMultiplaStrategyHandler implements StrategyHandler {
  constructor(
    private resposta: RespostaCampo<string[]>,
    private campo: CampoFormulario<CampoGrelhaMultipla>
  ) {}

  parseData() {
    const linhas: string[] = this.campo.configuracao_campo.opcoes.linhas || []
    const colunas: string[] = this.campo.configuracao_campo.opcoes.colunas || []

    const data: number[][] = this.resposta.valor.map((element: string) =>
      JSON.parse(element)
    )

    return {
      data,
      linhas,
      colunas
    }
  }

  getKeyName(linha: string, analyze: boolean) {
    return analyze
      ? linha
      : `${this.campo.configuracao_campo.titulo} [${linha}]`
  }

  fillWithNulls(result: object, analyze = false) {
    return this.campo.configuracao_campo.opcoes.linhas.reduce(
      (current, linha) => {
        const keyName = this.getKeyName(linha, analyze)

        if (!current[keyName]) {
          current[keyName] = analyze ? [] : ''
        }

        return current
      },
      result
    )
  }

  getExportFormat(analyze = false) {
    const { linhas, colunas, data } = this.parseData()
    const result = {}

    data.forEach(singleResponse => {
      const [linhaIdx, colunaIdx] = singleResponse
      const linha = linhas[linhaIdx]
      const coluna = colunas[colunaIdx]

      if (linha && coluna) {
        const resultColumnName = this.getKeyName(linha, analyze)

        result[resultColumnName] = analyze ? [coluna] : coluna
      }
    })

    return result
  }

  getAnalyzableData() {
    const data = this.getExportFormat(true)
    return this.fillWithNulls(data, true)
  }
}
