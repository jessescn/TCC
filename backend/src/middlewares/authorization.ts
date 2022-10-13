import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { Request } from 'types/express'
import { Middleware } from 'middlewares'
import { UnauthorizedError } from 'types/express/errors'
import { errorResponseHandler } from 'utils/response'

export class AuthTokenMiddleware extends Middleware {
  private checkHasInvalidTokenFormat = (req: Request) => {
    const { authorization } = req.headers
    const hasBearerPrefix = authorization.startsWith('Bearer ')

    if (!hasBearerPrefix) {
      throw new UnauthorizedError('invalid token format')
    }
  }

  private checkHasAuthorizationHeader = (req: Request) => {
    const { authorization } = req.headers

    if (!authorization) {
      throw new UnauthorizedError('token not provided')
    }
  }

  private validateRequest = (request: Request) => {
    this.checkHasAuthorizationHeader(request)
    this.checkHasInvalidTokenFormat(request)
  }

  private verifyAndDecodeToken = (request: Request) => {
    const { authorization } = request.headers
    const [, token] = authorization.split(' ')

    return jwt.verify(token, process.env.JWT_SECRET_KEY, {
      complete: true
    }) as JwtPayload
  }

  private appendActorToRequest = (request: Request) => {
    const { payload } = this.verifyAndDecodeToken(request)
    request.actor = payload.data
  }

  exec = (request: Request, response: Response, next: NextFunction) => {
    try {
      this.validateRequest(request)
      this.appendActorToRequest(request)
      next()
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
