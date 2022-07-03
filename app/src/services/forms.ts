import { AxiosResponse } from 'axios'
import { FormModel, NewForm } from 'domain/models/form'
import { httpClient } from './config'

export const FormService = {
  list: () => {
    return httpClient.request<AxiosResponse<FormModel[]>>({
      method: 'get',
      url: '/forms'
    })
  },
  create: (payload: NewForm) => {
    return httpClient.request<AxiosResponse<FormModel[]>>({
      method: 'post',
      url: '/forms',
      body: payload
    })
  },
  update: (formId: number, update: Partial<FormModel>) => {
    return httpClient.request<AxiosResponse<FormModel>>({
      method: 'put',
      url: `/forms/${formId}`,
      body: update
    })
  },
  delete: (formId: number) => {
    return httpClient.request<AxiosResponse<FormModel>>({
      method: 'delete',
      url: `/forms/${formId}`
    })
  }
}
