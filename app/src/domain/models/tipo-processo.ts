export type TipoProcessoStatus = 'ativo' | 'inativo' | 'rascunho'

export interface TipoProcessoModel {
  id: number
  nome: string
  descricao: string
  status: TipoProcessoStatus
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
