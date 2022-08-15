import { PermissionScope } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import {
  BadRequestError,
  RequestError,
  UnauthorizedError
} from 'types/express/errors'

export interface Controller {
  exec: (req: Request, res: Response) => Promise<void>
}

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

export const checkPermissionResource = (
  permission: PermissionScope,
  req: Request
) => {
  if (permission === 'not_allowed') {
    throw new UnauthorizedError()
  }
}

export const validateMandatoryFields = (
  fields: string[],
  data: any,
  message?: string
) => {
  fields.forEach(field => {
    if (!data[field]) {
      throw new BadRequestError(message)
    }
  })
}

export const checkIncludesInvalidFields = (
  fields: string[],
  data: any,
  message?: string
) => {
  let hasInvalidFields = false
  Object.keys(data).forEach(key => {
    if (!fields.includes(key)) {
      hasInvalidFields = true
    }
  })

  return hasInvalidFields
}
