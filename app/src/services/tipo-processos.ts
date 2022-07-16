import { AxiosResponse } from 'axios'
import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { httpClient } from './config'

export type NovoTipoProcesso = {
  nome: string
  descricao?: string
  dataInicio?: Date
  dataFim?: Date
  escopo: string
  colegiado: boolean
}

export const TipoProcessoService = {
  list: () => {
    return httpClient.request<AxiosResponse<TipoProcessoModel[]>>({
      method: 'get',
      url: '/tipo-processos'
    })
  },
  create: (payload: NovoTipoProcesso) => {
    return httpClient.request<AxiosResponse<TipoProcessoModel[]>>({
      method: 'post',
      url: '/tipo-processos',
      body: payload
    })
  },
  update: (formId: number, update: Partial<TipoProcessoModel>) => {
    return httpClient.request<AxiosResponse<TipoProcessoModel>>({
      method: 'put',
      url: `/tipo-processos/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<TipoProcessoModel>>({
      method: 'delete',
      url: `/tipo-processos/${formId}`
    })
  }
}
