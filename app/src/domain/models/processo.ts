import { ComentarioModel } from './comentario'
import { TipoProcessoModel } from './tipo-processo'
import { UserModel } from './user'

export const statusList = {
  criado: { label: 'Criado', color: 'info.warning' },
  correcoes_pendentes: { label: 'Correções Pendentes', color: 'info.warning' },
  em_analise: { label: 'Em análise', color: 'info.warning' },
  em_homologacao: { label: 'Em homologação', color: 'info.warning' },
  deferido: { label: 'Deferido', color: 'info.warning' },
  indeferido: { label: 'Infererido', color: 'info.warning' }
}

export type ProcessoStatus =
  | 'criado'
  | 'correcoes_pendentes'
  | 'em_analise'
  | 'em_homologacao'
  | 'deferido'
  | 'indeferido'

export type CampoInvalido = {
  formulario: number
  ordem: number
  comentario: string
  autor: number
}

export type RespostaCampo = {
  valor: any
  ordem: number
}

export type Resposta = {
  formulario: number
  campos: RespostaCampo[]
}

export type VotoProcesso = {
  aprovado: boolean
  autor: number
  data: string
}

export type Status = {
  data: string
  status: ProcessoStatus
}

export interface ProcessoModel {
  id: number
  status: Status[]
  camposInvalidos: CampoInvalido[]
  respostas: Resposta[]
  votos?: VotoProcesso[]
  tipo_processo?: TipoProcessoModel
  comentarios: ComentarioModel[]
  user?: UserModel
  createdBy?: number
  createdAt?: string
  updatedAt?: string
}

export interface RemoteProcessoModel {
  id: number
  status: string
  camposInvalidos: CampoInvalido[]
  respostas: string
  votos?: VotoProcesso[]
  deleted: boolean
  createdAt?: string
  upstringdAt?: string
  tipo_processo?: TipoProcessoModel
}

export interface NewProcesso {
  nome: string
  dataInicio: string
  dataFim: string
  dadosPreenchidos: string
  formulario: number
}
