import { AxiosResponse } from 'axios'
import { CampoFormulario, FormularioModel } from 'domain/models/formulario'
import { httpClient } from './config'

export type NovoFormulario = {
  nome: string
  campos: CampoFormulario[]
}

export const FormService = {
  list: () => {
    return httpClient.request<AxiosResponse<FormularioModel[]>>({
      method: 'get',
      url: '/forms'
    })
  },
  create: (payload: FormularioModel) => {
    return httpClient.request<AxiosResponse<FormularioModel[]>>({
      method: 'post',
      url: '/forms',
      body: payload
    })
  },
  update: (formId: number, update: Partial<FormularioModel>) => {
    return httpClient.request<AxiosResponse<FormularioModel>>({
      method: 'put',
      url: `/forms/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<FormularioModel>>({
      method: 'delete',
      url: `/forms/${formId}`
    })
  }
}
