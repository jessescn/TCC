import { NextFunction } from 'express'
import { routesPermissionsMap } from 'types/auth/routes-permissions'
import { Request, Response } from 'types/express'

const PermissionsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { permissoes: userPrivileges } = req

  const resource = req.originalUrl.split('/')[1]
  const method = req.method.toLowerCase()

  const resourcePermissions: string[] =
    routesPermissionsMap[resource][method] || []

  const havePermission = resourcePermissions.reduce((acc, permission) => {
    if (!userPrivileges[permission]) {
      return false
    }

    return acc && true
  }, true)

  if (!havePermission) {
    res.status(401).send()
    return
  }

  next()
}

export default PermissionsMiddleware
