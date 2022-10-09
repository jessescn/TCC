import admin from './admin'
import usuario from './usuario'

export const actors = { admin, usuario }

export type Scope = 'all' | 'owned'
export type PermissionKey = keyof typeof admin
export type Permissions = Record<PermissionKey, Scope | string>
export type Profiles = keyof typeof actors
