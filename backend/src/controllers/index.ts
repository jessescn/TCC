import { HttpStatusCode, Request, Response } from 'types/express'
import {
  BadRequestError,
  RequestError,
  UnauthorizedError
} from 'types/express/errors'

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

export const checkPermissionResource = (permission: string, req: Request) => {
  if (permission === 'owned' && req.user.id !== Number(req.params.id)) {
    throw new UnauthorizedError()
  }
}

export const validateMandatoryFields = (fields: string[], data: any) => {
  fields.forEach(field => {
    if (!data[field]) {
      throw new BadRequestError()
    }
  })
}
