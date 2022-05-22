import { HttpStatusCode, Request, Response } from 'types/express'

import jwt from 'jsonwebtoken'
import { UserService } from 'services/user-service'
import {
  BadRequestError,
  NotFoundError,
  RequestError,
  UnauthorizedError
} from 'types/express/errors'

type Credentials = {
  email: string
  password: string
}

export const errorResponseHandler = (res: Response, error: any) => {
  if (error instanceof RequestError) {
    res.status(error.status).send(error.message)
    return
  }

  res.status(HttpStatusCode.serverError).send()
}

export const AuthController = {
  token: async (req: Request, res: Response) => {
    try {
      const data: Credentials = req.body

      if (!data.email || !data.password) {
        throw new BadRequestError('invalid data')
      }

      const user = await UserService.getByEmail(data.email)

      if (!user) {
        throw new NotFoundError('user not found')
      }

      const isPasswordValid = await user.validPassword(data.password)

      if (!isPasswordValid) {
        throw new UnauthorizedError('invalid password')
      }

      const token = jwt.sign({ data: user }, process.env.JWT_SECRET_KEY)

      res.json({ token, expiresIn: process.env.JWT_TOKEN_EXPIRATION })
    } catch (error) {
      errorResponseHandler(res, error)
    }
  },
  me: async (req: Request, res: Response) => {
    try {
      res.json(req.user)
    } catch (error) {
      errorResponseHandler(res, error)
    }
  }
}
