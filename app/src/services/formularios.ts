import { AxiosResponse } from 'axios'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { httpClient } from './config'

export type NovoFormulario = {
  nome: string
  descricao?: string
  campos: CampoFormulario[]
}

export const FormService = {
  list: () => {
    return httpClient.request<AxiosResponse<FormularioModel[]>>({
      method: 'get',
      url: '/formularios'
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
