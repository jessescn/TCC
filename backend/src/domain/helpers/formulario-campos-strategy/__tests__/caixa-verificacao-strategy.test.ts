import { CampoFormulario } from 'domain/models/formulario'
import { RespostaCampo } from 'domain/models/procedimento'
import { CampoTipoCaixaVerificacao } from 'types/campos-formulario'
import { CaixaVerificacaoStrategyHandler } from '../caixa-verificacao-strategy'

describe('CaixaVerificacaoStrategy Test', () => {
  const resposta: RespostaCampo<string[]> = {
    ordem: 1,
    valor: ['Opção 1', 'Opção 2']
  }
  const campo: CampoFormulario<CampoTipoCaixaVerificacao> = {
    ordem: 1,
    tipo: 'caixa_verificacao',
    configuracao_campo: {
      titulo: 'Campo 1',
      opcoes: ['Opção 1', 'Opção 2', 'Opção 3']
    }
  }

  const sut = new CaixaVerificacaoStrategyHandler(resposta, campo)

  it('getExportFormat: should return data formated to export as file', () => {
    const resultExpected = {
      'Campo 1': 'Opção 1, Opção 2'
    }
    const result = sut.getExportFormat()

    expect(result).toEqual(resultExpected)
  })

  it('getAnalyzableData: should return data to plot in graphs', () => {
    const resultExpected = {
      'Campo 1': ['Opção 1', 'Opção 2']
    }
    const result = sut.getAnalyzableData()

    expect(result).toEqual(resultExpected)
  })
})
