import { EmailTemplate } from 'templates'

export type Pagination = {
  per_page: number
  page: number
  term: string | null
}

export type PaginationResponse<T> = {
  total: number
  data: T[]
}

export interface IRepository {
  findOne: (primaryKey: any) => Promise<any>
  findAll: (query: any, term?: string | null) => Promise<any>
  create: (data: any) => Promise<any>
  update: (primaryKey: any, data: any) => Promise<any>
  destroy: (primaryKey: any) => Promise<any>
}

export interface IMailRepository {
  send: (data: EmailTemplate) => Promise<any>
}
