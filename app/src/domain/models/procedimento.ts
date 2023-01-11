import { TipoProcedimentoModel } from './tipo-procedimento'
import { UserModel } from './user'

export const statusList = {
  criado: { label: 'Criado', color: 'secondary.dark' },
  correcoes_pendentes: { label: 'Correções Pendentes', color: 'info.warning' },
  em_analise: { label: 'Em análise', color: 'primary.default' },
  em_homologacao: { label: 'Em homologação', color: 'primary.dark' },
  deferido: { label: 'Deferido', color: 'info.success' },
  indeferido: { label: 'Indeferido', color: 'info.error' },
  encaminhado: { label: 'Encaminhado', color: 'info.successDarkest' }
}

export type ProcedimentoStatus = keyof typeof statusList

export type CampoInvalido = {
  formulario: number
  ordem: number
}

export type RespostaCampo = {
  valor: any
  ordem: number
}

export type Resposta = {
  formulario: number
  campos: RespostaCampo[]
}

export type VotoProcedimento = {
  aprovado: boolean
  autor: UserModel
  data: string
}

export type Status = {
  data: string
  status: ProcedimentoStatus
}

export type Revisao = {
  comentario: string
  data: string
  autor: UserModel
  campos: CampoInvalido[]
}

export interface ProcedimentoModel {
  id: number
  status: Status[]
  revisoes: Revisao[]
  respostas: Resposta[]
  votos?: VotoProcedimento[]
  tipo_procedimento?: TipoProcedimentoModel
  actor?: UserModel
  createdBy?: number
  createdAt?: string
  updatedAt?: string
}

export interface RemoteProcedimentoModel {
  id: number
  status: string
  camposInvalidos: CampoInvalido[]
  respostas: string
  votos?: ProcedimentoStatus[]
  deleted: boolean
  createdAt?: string
  upstringdAt?: string
  tipo_procedimento?: TipoProcedimentoModel
}

export interface NewProcedimento {
  nome: string
  dataInicio: string
  dataFim: string
  dadosPreenchidos: string
  formulario: number
}
