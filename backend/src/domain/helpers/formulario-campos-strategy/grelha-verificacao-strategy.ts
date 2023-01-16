import { CampoFormulario } from 'domain/models/formulario'
import { RespostaCampo } from 'domain/models/procedimento'
import { CampoTipoBase, StrategyHandler } from '.'

type CampoGrelhaVerificacao = CampoTipoBase & {
  opcoes: {
    linhas: string[]
    colunas: string[]
  }
}

export class GrelhaVerificacaoStrategyHandler implements StrategyHandler {
  constructor(
    private resposta: RespostaCampo<string[][]>,
    private campo: CampoFormulario<CampoGrelhaVerificacao>
  ) {}

  getExportFormat(analyze = false) {
    const result = {}
    const linhas = this.campo.configuracao_campo.opcoes.linhas || []
    const colunas = this.campo.configuracao_campo.opcoes.colunas || []

    const data = this.resposta.valor

    data.forEach(responsesByRow => {
      const columnResponses = []
      const linhaIdx = JSON.parse(responsesByRow[0])[0]
      const linha = linhas[linhaIdx]

      responsesByRow.forEach(response => {
        const [, colunaIdx] = JSON.parse(response) as number[]
        const coluna = colunas[colunaIdx]

        columnResponses.push(coluna)
      })

      const resultColumnName = analyze
        ? linha
        : `${this.campo.configuracao_campo.titulo} [${linha}]`

      result[resultColumnName] = analyze
        ? columnResponses
        : columnResponses.join(', ')
    })

    return result
  }

  getAnalyzableData() {
    return this.getExportFormat(true)
  }
}
