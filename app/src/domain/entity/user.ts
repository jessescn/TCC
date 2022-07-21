import { UserModel } from 'domain/models/user'
import { Roles } from 'domain/types/actors'

export class User {
  static haveRoles(user: UserModel, roles: Roles[]) {
    return roles.reduce((havePermission, role) => {
      const haveRole = user.roles.includes(role)

      if (!haveRole) {
        return false
      }

      return havePermission && haveRole
    }, true)
  }
}
