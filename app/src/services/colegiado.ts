import { AxiosResponse } from 'axios'
import { ComentarioModel } from 'domain/models/comentario'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { buildQuery } from 'utils/format'
import { httpClient, Pagination, PaginationResponse } from './config'

export type Vote = {
  autor: number
  aprovado: boolean
}

export type DeleteVote = {
  autor: number
}

export const ColegiadoService = {
  list: (pagination: Pagination) => {
    const query = buildQuery(pagination)

    return httpClient.request<
      AxiosResponse<PaginationResponse<ProcedimentoModel>>
    >({
      method: 'get',
      url: `/colegiado/procedimentos?${query}`
    })
  },
  vote: (procedimentoId: number, payload: Vote) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'post',
      url: `/colegiado/${procedimentoId}/vote`,
      body: payload
    })
  },
  deleteVote: (procedimentoId: number, payload: DeleteVote) => {
    return httpClient.request<AxiosResponse<ProcedimentoModel>>({
      method: 'delete',
      url: `/colegiado/${procedimentoId}/vote`,
      body: payload
    })
  },
  comments: (procedimentoId: number) => {
    return httpClient.request<AxiosResponse<ComentarioModel[]>>({
      method: 'get',
      url: `/colegiado/${procedimentoId}/comentarios`
    })
  }
}
