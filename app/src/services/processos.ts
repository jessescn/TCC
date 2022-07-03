import { AxiosResponse } from 'axios'
import { NewProcesso, ProcessoModel } from 'domain/models/processo'
import { httpClient } from './config'

export const ProcessoService = {
  list: () => {
    return httpClient.request<AxiosResponse<ProcessoModel[]>>({
      method: 'get',
      url: '/processos'
    })
  },
  create: (payload: NewProcesso) => {
    return httpClient.request<AxiosResponse<ProcessoModel>>({
      method: 'post',
      url: `/processos`,
      body: payload
    })
  },
  update: (formId: number, update: Partial<ProcessoModel>) => {
    return httpClient.request<AxiosResponse<ProcessoModel>>({
      method: 'put',
      url: `/processos/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<ProcessoModel>>({
      method: 'delete',
      url: `/processos/${formId}`
    })
  }
}
