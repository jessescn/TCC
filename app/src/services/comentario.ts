import { AxiosResponse } from 'axios'
import { ComentarioModel, NewComentario } from 'domain/models/comentario'
import { httpClient } from './config'

export const ComentarioService = {
  list: () => {
    return httpClient.request<AxiosResponse<ComentarioModel[]>>({
      method: 'get',
      url: '/comentarios'
    })
  },
  create: (payload: NewComentario) => {
    return httpClient.request<AxiosResponse<ComentarioModel>>({
      method: 'post',
      url: `/comentarios`,
      body: payload
    })
  },
  update: (formId: number, update: Partial<ComentarioModel>) => {
    return httpClient.request<AxiosResponse<ComentarioModel>>({
      method: 'put',
      url: `/comentarios/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<ComentarioModel>>({
      method: 'delete',
      url: `/comentarios/${formId}`
    })
  }
}
