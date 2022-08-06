import { AxiosResponse } from 'axios'
import { UserModel } from '../domain/models/user'
import { httpClient } from './config'

export type CreateUser = {
  name: string
  email: string
  password: string
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
  }
}
