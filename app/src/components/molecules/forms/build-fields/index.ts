import { CampoFormulario } from 'domain/models/formulario'
import CaixaVerificacaoBuilder from 'components/molecules/forms/build-fields/caixa-verificacao'
import DataBuilder from 'components/molecules/forms/build-fields/data'
import EscolhaMultiplaBuilder from 'components/molecules/forms/build-fields/escolha-multipla'
import FicheiroBuilder from 'components/molecules/forms/build-fields/ficheiro'
import GrelhaMultiplaBuilder from 'components/molecules/forms/build-fields/grelha-multipla'
import GrelhaVerificacaoBuilder from 'components/molecules/forms/build-fields/grelha-verificacao'
import HoraBuilder from 'components/molecules/forms/build-fields/hora'
import ParagrafoBuilder from 'components/molecules/forms/build-fields/paragrafo'
import RespostaBuilder from 'components/molecules/forms/build-fields/resposta'

export type BaseBuildFieldProps = {
  campo: CampoFormulario
  onUpdate: (campo: CampoFormulario) => void
}

export const opcoesCampos = new Map([
  ['paragrafo', { label: 'Parágrafo', render: ParagrafoBuilder }],
  ['resposta', { label: 'Resposta', render: RespostaBuilder }],
  ['data', { label: 'Data', render: DataBuilder }],
  ['hora', { label: 'Hora', render: HoraBuilder }],
  ['ficheiro', { label: 'Ficheiro', render: FicheiroBuilder }],
  [
    'escolha_multipla',
    { label: 'Escolha Múltipla', render: EscolhaMultiplaBuilder }
  ],
  [
    'caixa_verificacao',
    { label: 'Caixa Verificacão', render: CaixaVerificacaoBuilder }
  ],
  [
    'grelha_multipla',
    { label: 'Grelha Múltipla', render: GrelhaMultiplaBuilder }
  ],
  [
    'grelha_verificacao',
    { label: 'Grelha Verificacão', render: GrelhaVerificacaoBuilder }
  ]
])
