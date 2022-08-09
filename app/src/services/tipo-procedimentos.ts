import { AxiosResponse } from 'axios'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { httpClient } from './config'

export type NovoTipoProcedimento = {
  nome: string
  descricao?: string
  dataInicio?: Date
  dataFim?: Date
  escopo: string
  colegiado: boolean
}

export const TipoProcedimentoService = {
  list: () => {
    return httpClient.request<AxiosResponse<TipoProcedimentoModel[]>>({
      method: 'get',
      url: '/tipo-procedimentos'
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
  }
}
