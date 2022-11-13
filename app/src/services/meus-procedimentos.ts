import { AxiosResponse } from 'axios'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { buildQuery } from 'utils/format'
import { httpClient, Pagination, PaginationResponse } from './config'

export const MeusProcedimentosService = {
  list: (pagination: Pagination) => {
    const query = buildQuery(pagination)

    return httpClient.request<
      AxiosResponse<PaginationResponse<ProcedimentoModel>>
    >({
      method: 'get',
      url: `/procedimentos/actor?${query}`
    })
  }
}
