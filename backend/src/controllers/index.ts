/* eslint-disable camelcase */
import { PermissionKey, Scope } from 'domain/profiles'
import { Pagination } from 'repositories'
import { HttpStatusCode, Request, Response } from 'types/express'
import { RequestError } from 'types/express/errors'
import { validateMandatoryFields } from 'utils/fields'
import { checkPermissionResource } from 'utils/permission'

export interface IController {
  exec: (req: Request, res: Response) => Promise<void>
}

export const errorResponseHandler = (res: Response, error: any) => {
  console.error(error)

  if (error instanceof RequestError) {
    res.status(error.status).send(error.message)
    return
  }

  res.status(HttpStatusCode.serverError).send()
}

export const extractPagination = (request: Request) => {
  const { page, per_page, term, ...filters } = request.query

  const pagination: Pagination = {
    page: page ? Number(page) : 1,
    per_page: per_page ? Number(per_page) : 1000,
    term: (term as string) || null,
    ...filters
  }

  return pagination
}

export type Validation = (request: Request) => void

export type ControllerProps<T> = {
  validations: Validation[]
  permission?: PermissionKey
  mandatoryFields: string[]
  service: T
}

export type Props<T> = {
  validations?: Validation[]
  permission?: PermissionKey
  mandatoryFields?: string[]
  service: T
}

export abstract class Controller<T> implements IController {
  protected props: ControllerProps<T>

  constructor(props: Props<T>) {
    const defaultValidations = [
      this.hasPermissions,
      this.includesMandatoryFields
    ]

    this.props = {
      ...props,
      mandatoryFields: props.mandatoryFields || [],
      validations: [...defaultValidations, ...(props.validations || [])]
    }
  }

  get permission() {
    return this.props.permission
  }

  get mandatoryFields() {
    return this.props.mandatoryFields
  }

  get validations() {
    return this.props.validations
  }

  get service() {
    return this.props.service
  }

  abstract exec: (req: Request, res: Response) => Promise<any>

  hasPermissions = (req: Request) => {
    if (!this.permission) return

    const permissionValue = req.actor.profile.permissoes[
      this.permission
    ] as Scope
    checkPermissionResource(permissionValue)
  }

  includesMandatoryFields = (req: Request) => {
    if (this.mandatoryFields.length === 0) return

    validateMandatoryFields(this.mandatoryFields, req.body)
  }

  validateRequest = (req: Request) => {
    this.validations.forEach(validation => validation(req))
  }
}
