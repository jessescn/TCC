import { AxiosResponse } from 'axios'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { buildQuery } from 'utils/format'
import { httpClient, Pagination, PaginationResponse } from './config'

export type NovoFormulario = {
  nome: string
  descricao?: string
  campos: CampoFormulario[]
}

export const FormService = {
  list: (pagination: Pagination) => {
    const query = buildQuery(pagination)

    return httpClient.request<
      AxiosResponse<PaginationResponse<FormularioModel>>
    >({
      method: 'get',
      url: `/formularios?${query}`
    })
  },
  listByTipo: (tipoId: number) => {
    return httpClient.request<
      AxiosResponse<PaginationResponse<FormularioModel>>
    >({
      method: 'get',
      url: `/formularios/tipo-procedimento/${tipoId}`
    })
  },
  create: (payload: NovoFormulario) => {
    return httpClient.request<AxiosResponse<FormularioModel[]>>({
      method: 'post',
      url: '/formularios',
      body: payload
    })
  },
  update: (formId: number, update: Partial<FormularioModel>) => {
    return httpClient.request<AxiosResponse<FormularioModel>>({
      method: 'put',
      url: `/formularios/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<FormularioModel>>({
      method: 'delete',
      url: `/formularios/${formId}`
    })
  }
}
