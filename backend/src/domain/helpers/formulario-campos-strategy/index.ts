import { CampoFormulario } from 'domain/models/formulario'
import { RespostaCampo } from 'domain/models/procedimento'
import { CaixaVerificacaoStrategyHandler } from './caixa-verificacao-strategy'
import { GrelhaMultiplaStrategyHandler } from './grelha-multipla-strategy'
import { GrelhaVerificacaoStrategyHandler } from './grelha-verificacao-strategy'

export type CampoTipoBase = {
  titulo?: string
  descricao?: string
}

export interface StrategyHandler {
  getExportFormat: () => object
  getAnalyzableData: () => object
}

class DefaultStrategyHandler implements StrategyHandler {
  constructor(
    private resposta: RespostaCampo,
    private campo: CampoFormulario
  ) {}

  getExportFormat() {
    return {
      [this.campo.configuracao_campo?.titulo || '']: this.resposta.valor
    }
  }

  getAnalyzableData() {
    return {
      [this.campo.configuracao_campo?.titulo]: [this.resposta.valor]
    }
  }
}
export class TipoCampoRespostaStrategy {
  private handler: StrategyHandler

  constructor(private resposta: RespostaCampo, private campo: CampoFormulario) {
    switch (campo.tipo) {
      case 'grelha_multipla':
        this.handler = new GrelhaMultiplaStrategyHandler(
          this.resposta,
          this.campo
        )
        break
      case 'caixa_verificacao':
        this.handler = new CaixaVerificacaoStrategyHandler(
          this.resposta,
          this.campo
        )
        break
      case 'grelha_verificacao':
        this.handler = new GrelhaVerificacaoStrategyHandler(
          this.resposta,
          this.campo
        )
        break
      default:
        this.handler = new DefaultStrategyHandler(this.resposta, this.campo)
        break
    }
  }

  getExportFormat() {
    return this.handler.getExportFormat()
  }

  getAnalyzableData() {
    return this.handler.getAnalyzableData()
  }
}
