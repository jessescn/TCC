import { AxiosResponse } from 'axios'
import { ComentarioModel } from 'domain/models/comentario'
import {
  CampoInvalido,
  ProcedimentoModel,
  Resposta,
  ProcedimentoStatus
} from 'domain/models/procedimento'
import { httpClient } from './config'

export type NovoProcedimento = {
  tipo: number
  respostas: Resposta[]
  votos?: ProcedimentoStatus[]
}

export type Vote = {
  autor: number
  aprovado: boolean
}

export type StatusPayload = {
  status: string
}

export type RevisaoPayload = {
  comentario: string
  campos: CampoInvalido[]
}

export const ProcedimentoService = {
  list: () => {
    return httpClient.request<AxiosResponse<ProcedimentoModel[]>>({
      method: 'get',
      url: '/procedimentos'
    })
  },
  create: (payload: NovoProcedimento) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/procedimentos`,
      body: payload
    })
  },
  update: (procedimentoId: number, update: Partial<ProcedimentoModel>) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'put',
      url: `/procedimentos/${procedimentoId}`,
      body: update
    })
  },
  delete: (procedimentoId: number) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'delete',
      url: `/procedimentos/${procedimentoId}`
    })
  },
  vote: (procedimentoId: number, payload: Vote) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/procedimentos/${procedimentoId}/vote`,
      body: payload
    })
  },
  comments: (procedimentoId: number) => {
    return httpClient.request<AxiosResponse<ComentarioModel[]>>({
      method: 'get',
      url: `/procedimentos/${procedimentoId}/comentarios`
    })
  },
  updateStatus: (procedimentoId: number, payload: StatusPayload) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/procedimentos/${procedimentoId}/status`,
      body: payload
    })
  },
  revisao: (procedimentoId: number, payload: RevisaoPayload) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/procedimentos/${procedimentoId}/revisao`,
      body: payload
    })
  }
}
