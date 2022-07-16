import { AxiosResponse } from 'axios'
import {
  ProcessoModel,
  RemoteProcessoModel,
  VotoProcesso
} from 'domain/models/processo'
import { httpClient } from './config'

export type NovoProcesso = {
  tipo: number
  resposta: string
  votos?: VotoProcesso[]
}

export const ProcessoService = {
  list: () => {
    return httpClient.request<AxiosResponse<RemoteProcessoModel[]>>({
      method: 'get',
      url: '/processos'
    })
  },
  create: (payload: NovoProcesso) => {
    return httpClient.request<AxiosResponse<RemoteProcessoModel>>({
      method: 'post',
      url: `/processos`,
      body: payload
    })
  },
  update: (formId: number, update: Partial<ProcessoModel>) => {
    return httpClient.request<AxiosResponse<RemoteProcessoModel>>({
      method: 'put',
      url: `/processos/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<RemoteProcessoModel>>({
      method: 'delete',
      url: `/processos/${formId}`
    })
  }
}
