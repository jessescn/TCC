import { makeAuthTokenMiddleware } from './authorization-factory'
import { makePermissionsMiddleware } from './permission-factory'

export const authTokenMiddleware = makeAuthTokenMiddleware()
export const permissionsMiddleware = makePermissionsMiddleware()
