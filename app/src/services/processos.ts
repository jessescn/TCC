import { AxiosResponse } from 'axios'
import { ComentarioModel } from 'domain/models/comentario'
import { ProcessoModel, Resposta, VotoProcesso } from 'domain/models/processo'
import { httpClient } from './config'

export type NovoProcesso = {
  tipo: number
  respostas: Resposta[]
  votos?: VotoProcesso[]
}

export type Vote = {
  autor: number
  aprovado: boolean
}

export const ProcessoService = {
  list: () => {
    return httpClient.request<AxiosResponse<ProcessoModel[]>>({
      method: 'get',
      url: '/processos'
    })
  },
  create: (payload: NovoProcesso) => {
    return httpClient.request<AxiosResponse<ProcessoModel>>({
      method: 'post',
      url: `/processos`,
      body: payload
    })
  },
  update: (processoId: number, update: Partial<ProcessoModel>) => {
    return httpClient.request<AxiosResponse<ProcessoModel>>({
      method: 'put',
      url: `/processos/${processoId}`,
      body: update
    })
  },
  delete: (processoId: number) => {
    return httpClient.request<AxiosResponse<ProcessoModel>>({
      method: 'delete',
      url: `/processos/${processoId}`
    })
  },
  vote: (processoId: number, payload: Vote) => {
    return httpClient.request<AxiosResponse<ProcessoModel>>({
      method: 'post',
      url: `/processos/${processoId}/vote`,
      body: payload
    })
  },
  comments: (processoId: number) => {
    return httpClient.request<AxiosResponse<ComentarioModel[]>>({
      method: 'get',
      url: `/processos/${processoId}/comentarios`
    })
  }
}
