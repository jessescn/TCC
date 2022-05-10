import { httpClient } from './config'

type CreateUser = {
  name: string
  email: string
  password: string
}

export const UserService = {
  create: (data: CreateUser) => {
    return httpClient.request({
      method: 'post',
      url: '/users',
      body: data
    })
  }
}
