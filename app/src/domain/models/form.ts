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
  campos: FormField[]
  status: FormStatus
  createdAt?: string
  updatedAt?: string
}

export interface UpdateFormModel {
  nome?: string
  campos?: FormField[]
  status?: FormStatus
}
