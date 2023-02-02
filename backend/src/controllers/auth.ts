import { errorResponseHandler } from 'controllers'
import { Request, Response } from 'types/express'
import { UnauthorizedError } from 'types/express/errors'

export class AuthController {
  me = async (request: Request, response: Response) => {
    try {
      const { actor } = request

      if (!actor) {
        throw new UnauthorizedError('token inválido')
      }

      return response.json(request.actor)
    } catch (error) {
      errorResponseHandler(response, error)
    }
  }
}
