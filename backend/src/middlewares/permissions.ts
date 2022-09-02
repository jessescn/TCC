import { NextFunction } from 'express'
import { Middleware } from 'middlewares'
import { PermissionKeys } from 'types/auth/actors'
import { routesPermissionsMap } from 'types/auth/routes-permissions'
import { Request, Response } from 'types/express'
import { UnauthorizedError } from 'types/express/errors'
import { errorResponseHandler } from 'utils/response'

export class PermissionsMiddleware extends Middleware {
  private extractRequiredKeys = (req: Request) => {
    const resource = req.originalUrl.split('/')[1]
    const method = req.method.toLowerCase()

    const requiredPermissions: string[] =
      routesPermissionsMap[resource][method] || []

    return requiredPermissions
  }

  private compareRequiredKeysWithPermissions = (
    permissions: PermissionKeys,
    requiredKeys: string[]
  ) => {
    return requiredKeys.reduce((acc, permission) => {
      if (!permissions[permission]) {
        return false
      }

      return acc && true
    }, true)
  }

  private verifyHasAllRequiredPermissions = (req: Request) => {
    const { permissoes } = req.user

    const requiredKeys = this.extractRequiredKeys(req)

    return this.compareRequiredKeysWithPermissions(permissoes, requiredKeys)
  }

  exec = (req: Request, res: Response, next: NextFunction) => {
    try {
      const hasPermission = this.verifyHasAllRequiredPermissions(req)

      if (!hasPermission) {
        throw new UnauthorizedError()
      }

      next()
    } catch (error) {
      errorResponseHandler(error, res)
    }
  }
}
