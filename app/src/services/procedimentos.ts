import { AxiosResponse } from 'axios'
import { ComentarioModel } from 'domain/models/comentario'
import { FormularioModel } from 'domain/models/formulario'
import {
  CampoInvalido,
  ProcedimentoModel,
  Resposta,
  ProcedimentoStatus
} from 'domain/models/procedimento'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'
import { buildQuery } from 'utils/format'
import { httpClient, Pagination } from './config'

export type NovoProcedimento = {
  tipo: number
  respostas: Resposta[]
  votos?: ProcedimentoStatus[]
}

export type ProcedimentoDetails = {
  procedimento: ProcedimentoModel
  comentarios: ComentarioModel[]
  tipoProcedimento: TipoProcedimentoModel
  formularios: FormularioModel[]
}

export type Vote = {
  autor: number
  aprovado: boolean
  procedimentoId: number
}

export type DeleteVote = {
  autor: number
}

export type StatusPayload = {
  status: string
}

export type RevisaoPayload = {
  comentario: string
  campos: CampoInvalido[]
}

export const ProcedimentoService = {
  list: (pagination: Pagination) => {
    const query = buildQuery(pagination)

    return httpClient.request<AxiosResponse<ProcedimentoModel[]>>({
      method: 'get',
      url: `/procedimentos?${query}`
    })
  },
  details: (id: number) => {
    return httpClient.request<AxiosResponse<ProcedimentoDetails>>({
      method: 'get',
      url: `/procedimentos/${id}/detalhes`
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
  vote: (payload: Vote) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/colegiado/vote`,
      body: payload
    })
  },
  deleteVote: (procedimentoId: number, autor: number) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'delete',
      url: `/colegiado/vote`,
      body: { autor, procedimentoId }
    })
  },
  comments: (procedimentoId: number) => {
    return httpClient.request<AxiosResponse<ComentarioModel[]>>({
      method: 'get',
      url: `/colegiado/${procedimentoId}/comentarios`
    })
  },
  updateStatus: (procedimentoId: number, payload: StatusPayload) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/procedimentos/${procedimentoId}/status`,
      body: payload
    })
  },
  review: (procedimentoId: number, payload: RevisaoPayload) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/procedimentos/${procedimentoId}/revisao`,
      body: payload
    })
  },
  forwardToSecretaria: (procedimentoId: number) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/procedimentos/${procedimentoId}/encaminhamento-secretaria`
    })
  }
}
