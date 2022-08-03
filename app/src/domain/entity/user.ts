import { UserModel } from 'domain/models/user'
import { Roles } from 'domain/types/actors'

export class User {
  static haveAllRoles(user: UserModel, roles: Roles[]) {
    return roles.reduce((havePermission, role) => {
      const haveRole = user.roles.includes(role)

      if (!haveRole) {
        return false
      }

      return havePermission && haveRole
    }, true)
  }

  static haveOneRole(user: UserModel, roles: Roles[]) {
    return roles.reduce((havePermission, role) => {
      const haveRole = user.roles.includes(role)

      if (haveRole) {
        return true
      }

      return havePermission || false
    }, false)
  }
}
