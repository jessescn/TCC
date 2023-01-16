import { CampoFormulario } from 'domain/models/formulario'
import { RespostaCampo } from 'domain/models/procedimento'
import {
  CampoGrelhaVerificacao,
  GrelhaVerificacaoStrategyHandler
} from '../grelha-verificacao-strategy'

describe('GrelhaVerificaoStrategy Test', () => {
  const resposta: RespostaCampo<string[][]> = {
    ordem: 1,
    valor: [['[0,0]'], ['[1,0]', '[1,1]']]
  }
  const campo: CampoFormulario<CampoGrelhaVerificacao> = {
    ordem: 1,
    tipo: 'caixa_verificacao',
    configuracao_campo: {
      titulo: 'Campo 1',
      opcoes: {
        linhas: ['Linha 1', 'Linha 2'],
        colunas: ['Coluna 1', 'Coluna 2']
      }
    }
  }

  const sut = new GrelhaVerificacaoStrategyHandler(resposta, campo)

  it('getExportFormat: should return data formated to export as file', () => {
    const resultExpected = {
      'Campo 1 [Linha 1]': 'Coluna 1',
      'Campo 1 [Linha 2]': 'Coluna 1, Coluna 2'
    }
    const result = sut.getExportFormat()

    expect(result).toEqual(resultExpected)
  })

  it('getAnalyzableData: should return data to plot in graphs', () => {
    const resultExpected = {
      'Linha 1': ['Coluna 1'],
      'Linha 2': ['Coluna 1', 'Coluna 2']
    }
    const result = sut.getAnalyzableData()

    expect(result).toEqual(resultExpected)
  })
})
