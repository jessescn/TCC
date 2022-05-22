import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { Request } from 'types/express'

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).send('token not provided')

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') {
    return res.status(401).send('invalid token')
  }

  try {
    const { payload } = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      complete: true
    }) as JwtPayload
    req.permissions = payload.data?.permissions || {}
    req.user = payload.data
  } catch (error) {
    return res.status(401).send(error.message)
  }

  next()
}

export default AuthMiddleware
