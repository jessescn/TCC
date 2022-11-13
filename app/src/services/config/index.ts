import { AxiosHttpClient } from './axios-client'

export type { HttpMethod, HttpRequest } from './axios-client'

export type Pagination = {
  page: number
  per_page: number
  term: string | null
}

export type PaginationResponse<T> = {
  data: T[]
  total: number
}

export const httpClient = new AxiosHttpClient()
