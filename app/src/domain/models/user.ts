import { ProfileType } from 'domain/types/actors'

export interface UserModel {
  id: number
  nome: string
  email: string
  profile: ProfileModel
  publico: string[]
  createdAt?: string
  updatedAt?: string
  deleted: boolean
}

export interface ProfileModel {
  id: number
  nome: ProfileType
  permissoes: Record<string, string>
  createdAt?: string
  updatedAt?: string
}
