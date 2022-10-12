import admin from './admin'
import usuario from './usuario'
import coordenacao from './coordenacao'
import colegiado from './colegiado'

export const actors = { admin, usuario, coordenacao, colegiado }

export type Scope = 'all' | 'owned'
export type PermissionKey = keyof typeof admin
export type Permissions = Partial<Record<PermissionKey, string>>
export type Profiles = keyof typeof actors
