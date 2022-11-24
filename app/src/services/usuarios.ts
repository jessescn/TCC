import { AxiosResponse } from 'axios'
import { buildQuery } from 'utils/format'
import { UserModel, ProfileModel } from '../domain/models/user'
import { httpClient, Pagination, PaginationResponse } from './config'

export type CreateUser = {
  nome: string
  email: string
  senha: string
}

export type UpdateUser = {
  nome: string
  permissoes: number
  publico: string[]
}

export const UserService = {
  create: (data: CreateUser) => {
    return httpClient.request<AxiosResponse<UserModel>>({
      method: 'post',
      url: '/users',
      body: data
    })
  },
  createBulk: (data: File) => {
    const bodyFormData = new FormData()
    bodyFormData.set('file', data)

    return httpClient.request<AxiosResponse<UserModel[]>>({
      method: 'post',
      url: `/users/bulk-create`,
      headers: { 'Content-Type': 'multipart/form-data' },
      body: bodyFormData
    })
  },
  update: (id: number, data: UpdateUser) => {
    return httpClient.request<AxiosResponse<UserModel>>({
      method: 'put',
      url: `/users/${id}`,
      body: data
    })
  },
  publicos: () => {
    return httpClient.request({
      method: 'get',
      url: '/users/publicos'
    })
  },
  profiles: () => {
    return httpClient.request<AxiosResponse<ProfileModel>>({
      method: 'get',
      url: '/profiles'
    })
  },
  list: (pagination: Pagination) => {
    const query = buildQuery(pagination)

    return httpClient.request<AxiosResponse<PaginationResponse<UserModel>>>({
      method: 'get',
      url: `/users?${query}`
    })
  },
  delete: (id: number) => {
    return httpClient.request({
      method: 'delete',
      url: `/users/${id}`
    })
  },
  details: (id: number) => {
    return httpClient.request<AxiosResponse<UserModel>>({
      method: 'get',
      url: `/users/${id}`
    })
  }
}
