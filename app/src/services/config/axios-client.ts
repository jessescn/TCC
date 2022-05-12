/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  params?: any
  headers?: any
}

const apiURL = process.env.REACT_APP_API_BASE_URL

export class AxiosHttpClient {
  redirectToAuth() {
    localStorage.removeItem('access_token')
    window.location.reload()
  }

  async request<T = any>(data: HttpRequest, customURL?: string) {
    const baseURL = customURL || apiURL
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${accessToken}`
        })
      })
    }

    const response = await axios.request<T>({
      url: `${baseURL}${data.url}`,
      method: data.method,
      data: data.body,
      params: data.params,
      headers: data.headers
    })

    if (response.status === 401) {
      this.redirectToAuth()
      return response
    }

    return response
  }
}
