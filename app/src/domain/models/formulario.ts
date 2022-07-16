export type FormStatus = 'ativo' | 'inativo' | 'rascunho'

export type CampoFormulario = {
  ordem: number
  pergunta?: string
  descricao?: string
  obrigatorio: boolean
  outros?: any
}

export interface FormularioModel {
  id: number
  nome: string
  campos: CampoFormulario[]
  createdAt?: string
  updatedAt?: string
}
