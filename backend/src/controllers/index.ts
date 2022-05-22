import { HttpStatusCode, Request, Response } from 'types/express'
import { RequestError } from 'types/express/errors'

export interface CrudController {
  create: (req: Request, res: Response) => Promise<void>
  read: (req: Request, res: Response) => Promise<void>
  readById: (req: Request, res: Response) => Promise<void>
  update: (req: Request, res: Response) => Promise<void>
  delete: (req: Request, res: Response) => Promise<void>
}

export const errorResponseHandler = (res: Response, error: any) => {
  if (error instanceof RequestError) {
    res.status(error.status).send(error.message)
    return
  }

  res.status(HttpStatusCode.serverError).send()
}
