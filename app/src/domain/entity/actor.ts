import { UserModel } from 'domain/models/user'

export type PermissionScope = {
  name: string
  scope: 'owned' | 'all'
}
export class Actor {
  static includesInProfiles(user: UserModel, permissions: PermissionScope[]) {
    const actorPermissions = user.profile.permissoes

    const hasAllPermissions = permissions.reduce((current, permission) => {
      const actorScope = actorPermissions[permission.name]
      const requiredScope = permission.scope

      if (
        !actorScope ||
        (requiredScope === 'all' && actorScope !== requiredScope)
      ) {
        return false
      }

      return current && true
    }, true)

    return hasAllPermissions
  }

  static includesInPublicos(user: UserModel, publicos: string[]) {
    if (publicos.length === 0) return true

    const userPublicos = user.publico

    const intersection = userPublicos.filter(publico =>
      publicos.includes(publico)
    )

    return intersection.length > 0
  }
}
