import { AxiosResponse } from 'axios'
import { FormularioModel } from 'domain/models/formulario'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { buildQuery } from 'utils/format'
import { httpClient, Pagination, PaginationResponse } from './config'

export type NovoTipoProcedimento = {
  nome: string
  descricao?: string
  dataInicio?: Date
  dataFim?: Date
  escopo: string
  colegiado: boolean
}

export type AnaliseDadosPayload = {
  formulario: number
  campo: string
  filtros?: any
}

export type FetchData = {
  procedimento: number
  date: string
  values: {
    [label: string]: string[]
  }
}

export type AnaliseDadosResponse = {
  tipoProcedimento: TipoProcedimentoModel
  formulario: FormularioModel
  data: FetchData[]
}

export const TipoProcedimentoService = {
  list: (pagination: Pagination) => {
    const query = buildQuery(pagination)

    return httpClient.request<
      AxiosResponse<PaginationResponse<TipoProcedimentoModel>>
    >({
      method: 'get',
      url: `/tipo-procedimentos?${query}`
    })
  },
  create: (payload: NovoTipoProcedimento) => {
    return httpClient.request<AxiosResponse<TipoProcedimentoModel[]>>({
      method: 'post',
      url: '/tipo-procedimentos',
      body: payload
    })
  },
  update: (formId: number, update: Partial<TipoProcedimentoModel>) => {
    return httpClient.request<AxiosResponse<TipoProcedimentoModel>>({
      method: 'put',
      url: `/tipo-procedimentos/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<TipoProcedimentoModel>>({
      method: 'delete',
      url: `/tipo-procedimentos/${formId}`
    })
  },
  details: (id: number) => {
    return httpClient.request<AxiosResponse<TipoProcedimentoModel>>({
      method: 'get',
      url: `/tipo-procedimentos/${id}`
    })
  },
  analiseDados: (id: number, data: AnaliseDadosPayload) => {
    return httpClient.request<AxiosResponse<FetchData[]>>({
      method: 'post',
      url: `/tipo-procedimentos/${id}/analyzable-data`,
      body: data
    })
  }
}
