import { PermissionScope } from 'types/auth/actors'
import { UnauthorizedError } from 'types/express/errors'

export const checkPermissionResource = (permission: PermissionScope) => {
  if (permission === 'not_allowed') {
    throw new UnauthorizedError()
  }
}
