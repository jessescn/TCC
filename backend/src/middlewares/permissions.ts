import { NextFunction } from 'express'
import { Request, Response } from 'types/express'

const routes = {
  token: {
    post: []
  },
  me: {
    get: []
  },
  users: {
    post: ['user_create'],
    get: ['user_read'],
    put: ['user_update'],
    delete: ['user_delete']
  }
}

const PermissionsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { permissions: userPrivileges } = req

  const resource = req.originalUrl.split('/')[1]
  const method = req.method.toLowerCase()

  const resourcePermissions: string[] = routes[resource][method] || []

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
