import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { Request } from 'types/express'
import { Middleware } from 'middlewares'
import { UnauthorizedError } from 'types/express/errors'
import { errorResponseHandler } from 'utils/response'
import { IActorService } from 'services/actor'

export class AuthTokenMiddleware extends Middleware {
  constructor(private actorService: IActorService) {
    super()
  }

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

  private appendActorToRequest = async (request: Request) => {
    const { payload } = this.verifyAndDecodeToken(request)

    const [actor] = await this.actorService.findAll({
      email: payload.data.email
    })

    if (!actor) {
      throw new UnauthorizedError('Actor não encontrado')
    }

    request.actor = JSON.parse(JSON.stringify(actor))
  }

  exec = async (request: Request, response: Response, next: NextFunction) => {
    try {
      this.validateRequest(request)
      await this.appendActorToRequest(request)
      next()
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
