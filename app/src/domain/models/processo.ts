import { ComentarioModel } from './comentario'
import { FormField, FormStatus } from './form'

export type ProcessoStatus = 'criado' | ''

interface FormModel {
  id: number
  nome: string
  descricao?: string
  campos: FormField[]
  status: FormStatus
  createdAt?: string
  updatedAt?: string
}

export interface ProcessoModel {
  id: number
  nome: string
  status: string
  dadosPreenchidos: string
  dataInicio: string
  dataFim: string
  formulario: FormModel
  comentarios: ComentarioModel[]
  createdAt?: string
  updatedAt?: string
}

export interface NewProcesso {
  nome: string
  dataInicio: string
  dataFim: string
  dadosPreenchidos: string
  formulario: number
}
