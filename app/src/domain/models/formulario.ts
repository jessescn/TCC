import { UserModel } from './user'

export type CampoTipoBase = {
  titulo?: string
  descricao?: string
}

export type CampoTipoResposta = CampoTipoBase

export type CampoTipoData = CampoTipoBase

export type CampoTipoHora = CampoTipoBase

export type CampoTipoParagrafo = CampoTipoBase

export type CampoTipoEscolhaMultipla = CampoTipoBase & {
  opcoes: string[]
  outro?: boolean
}

export type CampoTipoCaixaVerificacao = CampoTipoBase & {
  opcoes: string[]
  outro?: boolean
}

export type CampoTipoFicheiro = CampoTipoBase & {
  quantidade_arquivos: number
  tamanho_maximo: number
}

export type CampoTipoGrelhaMultipla = CampoTipoBase & {
  opcoes: {
    linhas: string[]
    colunas: string[]
  }
}

export type CampoTipoGrelhaVerificacao = CampoTipoBase & {
  opcoes: {
    linhas: string[]
    colunas: string[]
  }
}

export type CampoTipos = {
  paragrafo: CampoTipoParagrafo
  resposta: CampoTipoResposta
  data: CampoTipoData
  hora: CampoTipoHora
  escolha_multipla: CampoTipoEscolhaMultipla
  caixa_verificacao: CampoTipoCaixaVerificacao
  grelha_multipla: CampoTipoGrelhaMultipla
  grelha_verificacao: CampoTipoGrelhaVerificacao
}

export type TipoCampoFormulario =
  | 'paragrafo'
  | 'resposta'
  | 'data'
  | 'hora'
  | 'escolha_multipla'
  | 'caixa_verificacao'
  | 'grelha_multipla'
  | 'grelha_verificacao'

export type CampoFormulario<T = any> = {
  ordem: number
  tipo: TipoCampoFormulario
  obrigatorio?: boolean
  configuracao_campo: T
}

export interface FormularioModel {
  id: number
  nome: string
  descricao?: string
  template: string | null
  campos: CampoFormulario[]
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  actor?: UserModel
  deleted: boolean
}
