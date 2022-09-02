import { HttpStatusCode, Response } from 'types/express'
import { RequestError } from 'types/express/errors'

export const errorResponseHandler = (res: Response, error: any) => {
  if (error instanceof RequestError) {
    res.status(error.status).send(error.message)
    return
  }

  res.status(HttpStatusCode.serverError).send()
}
