export type FormStatus = 'ativo' | 'inativo' | 'rascunho'

export interface FormField {
  name: string
  placeholder: string
  order: 1
  required: boolean
  type: string
}

export interface FormModel {
  id: number
  nome: string
  descricao?: string
  campos: FormField[]
  status: FormStatus
  createdAt?: string
  updatedAt?: string
}

export interface NewForm {
  nome: string
  campos: FormField[]
  status?: FormStatus
}
