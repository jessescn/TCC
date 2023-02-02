import { Request } from 'types/express'

export interface UseCase<T = any> {
  execute: (request: Request) => Promise<T>
}
