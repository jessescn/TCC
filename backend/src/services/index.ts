export interface IService<T, Query> {
  findOne: (id: number) => Promise<T>
  findAll: (query?: Query) => Promise<T[]>
  delete: (id: number) => Promise<T>
}
