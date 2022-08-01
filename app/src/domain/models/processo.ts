import { TipoProcessoModel } from './tipo-processo'
import { UserModel } from './user'

export type ProcessoStatus = 'criado' | ''

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
  data: Date
}

export type Status = {
  data: string
  status: string
}

export interface ProcessoModel {
  id: number
  status: Status[]
  camposInvalidos: CampoInvalido[]
  respostas: Resposta[]
  votos?: VotoProcesso[]
  tipo_processo?: TipoProcessoModel
  createdBy?: UserModel
  createdAt?: string
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
