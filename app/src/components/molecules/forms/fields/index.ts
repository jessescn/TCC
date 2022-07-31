import { FormularioModel, TipoCampoFormulario } from 'domain/models/formulario'
import { RespostaCampo } from 'domain/models/processo'
import { CampoCaixaVerificacao } from './caixa-verificacao'
import { CampoData } from './data'
import { CampoEscolhaMultipla } from './escolha-multipla'
import { CampoFicheiro } from './ficheiro'
import { CampoGrelhaMultipla } from './grelha-multipla'
import { CampoGrelhaVerificacao } from './grelha-verificacao'
import { CampoHora } from './hora'
import { CampoParagrafo } from './paragrafo'
import { CampoResposta } from './resposta'

type CampoComponente = Record<TipoCampoFormulario, (props: any) => JSX.Element>

export type BaseCampoProps = {
  formulario: FormularioModel
  onUpdateResposta: (novoCampo: RespostaCampo) => void
}

export const campoComponente: CampoComponente = {
  paragrafo: CampoParagrafo,
  resposta: CampoResposta,
  data: CampoData,
  hora: CampoHora,
  ficheiro: CampoFicheiro,
  escolha_multipla: CampoEscolhaMultipla,
  caixa_verificacao: CampoCaixaVerificacao,
  grelha_multipla: CampoGrelhaMultipla,
  grelha_verificacao: CampoGrelhaVerificacao
}
