import { AxiosHttpClient } from './axios-client'

export type { HttpMethod, HttpRequest } from './axios-client'

export const httpClient = new AxiosHttpClient()
