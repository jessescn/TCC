import { httpClient } from './config'
import { AxiosResponse } from 'axios'
import { UserModel } from '../domain/models/user'

export type Credentials = {
  senha: string
  email: string
}

export type CredentialsResponse = {
  token: string
  expiresIn: string
}

export const AuthService = {
  token: (data: Credentials) => {
    return httpClient.request<AxiosResponse<CredentialsResponse>>({
      url: '/token',
      method: 'post',
      body: data
    })
  },
  me: () => {
    return httpClient.request<AxiosResponse<UserModel>>({
      url: '/me',
      method: 'get'
    })
  }
}
