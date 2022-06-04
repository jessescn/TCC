export interface BaseService<T> {
  getAll: () => Promise<T[]>
  getById: (id: number) => Promise<T | null>
  create: (data: any) => Promise<T>
  update: (id: number, data: any) => Promise<T>
  destroy: (id: number) => Promise<T | null>
}
