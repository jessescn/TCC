import { Roles } from 'domain/types/actors'

export interface UserModel {
  id: number
  nome: string
  email: string
  roles: Roles[]
  createdAt?: string
  updatedAt?: string
}
