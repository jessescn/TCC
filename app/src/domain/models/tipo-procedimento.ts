export type TipoProcedimentoStatus = 'ativo' | 'inativo' | 'rascunho'

export interface TipoProcedimentoModel {
  id: number
  nome: string
  descricao: string
  status: TipoProcedimentoStatus
  formularios: number[]
  dataInicio?: string
  dataFim?: string
  escopo: string
  publicos: string[]
  colegiado: boolean
  deleted?: boolean
  createdAt?: string
  updatedAt?: string
}
