import { CampoFormulario } from 'domain/models/formulario'
import { RespostaCampo } from 'domain/models/procedimento'
import { CampoTipoBase, StrategyHandler } from '.'

type CampoCaixaVerificacao = CampoTipoBase & {
  opcoes: string[]
  outro?: boolean
}

export class CaixaVerificacaoStrategyHandler implements StrategyHandler {
  constructor(
    private resposta: RespostaCampo<string[]>,
    private campo: CampoFormulario<CampoCaixaVerificacao>
  ) {}

  getExportFormat() {
    const data = this.resposta.valor.join(', ')

    return {
      [this.campo.configuracao_campo.titulo]: data
    }
  }

  getAnalyzableData() {
    return {
      [this.campo.configuracao_campo.titulo]: this.resposta.valor
    }
  }
}
