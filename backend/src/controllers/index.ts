import { PermissionKey, PermissionScope } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import {
  BadRequestError,
  RequestError,
  UnauthorizedError
} from 'types/express/errors'

export interface IController {
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
    if (!(field in data)) {
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

export type Validation = (request: Request) => void
export type ControllerProperties = {
  validations?: Validation[]
  permission?: PermissionKey
  mandatoryFields?: string[]
}

export abstract class Controller implements IController {
  protected validations: Validation[] = []
  protected mandatoryFields: string[] = []
  protected permission: PermissionKey

  constructor({
    permission,
    validations,
    mandatoryFields
  }: ControllerProperties) {
    this.validations = [
      this.hasPermissions,
      this.includesMandatoryFields,
      ...validations
    ]
    this.mandatoryFields = mandatoryFields
    this.permission = permission
  }

  hasPermissions = (req: Request) => {
    if (!this.permission) return

    const permissionValue = req.user.permissoes[this.permission]
    checkPermissionResource(permissionValue, req)
  }

  includesMandatoryFields = (req: Request) => {
    if (this.mandatoryFields.length === 0) return

    validateMandatoryFields(this.mandatoryFields, req.body)
  }

  validateRequest = (req: Request) => {
    this.validations.forEach(validation => validation(req))
  }

  exec = (request: Request, response: Response) => {
    return null
  }
}
