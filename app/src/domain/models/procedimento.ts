import { ComentarioModel } from './comentario'
import { TipoProcedimentoModel } from './tipo-procedimento'
import { UserModel } from './user'

export const statusList = {
  criado: { label: 'Criado', color: 'info.warning' },
  correcoes_pendentes: { label: 'Correções Pendentes', color: 'info.warning' },
  em_analise: { label: 'Em análise', color: 'info.warning' },
  em_homologacao: { label: 'Em homologação', color: 'info.warning' },
  deferido: { label: 'Deferido', color: 'info.warning' },
  indeferido: { label: 'Indeferido', color: 'info.warning' }
}

export type ProcedimentoStatus =
  | 'criado'
  | 'correcoes_pendentes'
  | 'em_analise'
  | 'em_homologacao'
  | 'deferido'
  | 'indeferido'

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
  autor: number
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
  comentarios: ComentarioModel[]
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
