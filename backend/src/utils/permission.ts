import { Scope } from 'domain/profiles'
import { UnauthorizedError } from 'types/express/errors'

export const checkPermissionResource = (permission: Scope) => {
  if (!permission) {
    throw new UnauthorizedError()
  }
}
