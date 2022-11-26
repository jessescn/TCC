import { ProfileType } from 'domain/types/actors'

export interface UserModel {
  id: number
  nome: string
  email: string
  profile: ProfileModel
  permissoes?: number
  publico: string[]
  createdAt?: string
  updatedAt?: string
  deleted: boolean
  verificado: boolean
}

export interface ProfileModel {
  id: number
  nome: ProfileType
  permissoes: Record<string, string>
  createdAt?: string
  updatedAt?: string
}
