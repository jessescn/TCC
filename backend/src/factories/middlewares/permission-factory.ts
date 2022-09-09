import { PermissionsMiddleware } from 'middlewares/permissions'

export const makePermissionsMiddleware = () => {
  return new PermissionsMiddleware()
}
