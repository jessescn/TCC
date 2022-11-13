import { Pagination, PaginationResponse } from 'repositories'

export interface IService<T, Query> {
  findOne: (id: number) => Promise<T>
  findAll: (
    query?: Query,
    pagination?: Pagination
  ) => Promise<PaginationResponse<T> | T[]>
  delete: (id: number) => Promise<T>
}
