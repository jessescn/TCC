import { AxiosResponse } from 'axios'
import { buildQuery } from 'utils/format'
import { UserModel } from '../domain/models/user'
import { httpClient, Pagination, PaginationResponse } from './config'

export type CreateUser = {
  nome: string
  email: string
  senha: string
}

export const UserService = {
  create: (data: CreateUser) => {
    return httpClient.request<AxiosResponse<UserModel>>({
      method: 'post',
      url: '/users',
      body: data
    })
  },
  publicos: () => {
    return httpClient.request({
      method: 'get',
      url: '/users/publicos'
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
  }
}
