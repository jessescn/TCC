import { UserModel } from './user'

export type TipoCampoFormulario =
  | 'paragrafo'
  | 'resposta'
  | 'data'
  | 'hora'
  | 'ficheiro'
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
  campos: CampoFormulario[]
  createdAt?: string
  updatedAt?: string
  createdBy?: number
  user?: UserModel
}
