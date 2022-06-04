import { AxiosResponse } from 'axios'
import { FormModel, UpdateFormModel } from 'domain/models/form'
import { httpClient } from './config'

export type UpdateForm = Record<keyof UpdateFormModel, any>

export const FormService = {
  list: () => {
    return httpClient.request<AxiosResponse<FormModel[]>>({
      method: 'get',
      url: '/forms'
    })
  },
  update: (formId: number, update: UpdateForm) => {
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
