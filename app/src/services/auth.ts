import { httpClient } from './config'
import { AxiosResponse } from 'axios'
import { UserModel } from '../domain/models/user'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'

export type AuthCredentials = {
  senha: string
  email: string
}

export type CredentialsResponse = {
  token: string
  expiresIn: string
}

export type SidebarInfo = {
  open: TipoProcedimentoModel[]
}

export const AuthService = {
  token: (data: AuthCredentials) => {
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
  },
  sidebarInfo: () => {
    return httpClient.request<AxiosResponse<SidebarInfo>>({
      method: 'get',
      url: '/users/sidebar'
    })
  },
  emailConfirmation: () => {
    return httpClient.request({
      method: 'post',
      url: '/email-verification'
    })
  },
  exchangeEmailConfirmationCode: (code: string) => {
    const payload = { code }

    return httpClient.request<AxiosResponse<UserModel>>({
      method: 'post',
      url: '/email-verification/code',
      body: payload
    })
  }
}
