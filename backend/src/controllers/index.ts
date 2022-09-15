import { PermissionKey } from 'types/auth/actors'
import { HttpStatusCode, Request, Response } from 'types/express'
import { RequestError } from 'types/express/errors'
import { validateMandatoryFields } from 'utils/fields'
import { checkPermissionResource } from 'utils/permission'

export interface IController {
  exec: (req: Request, res: Response) => Promise<void>
}

export const errorResponseHandler = (res: Response, error: any) => {
  if (error instanceof RequestError) {
    res.status(error.status).send(error.message)
    return
  }

  res.status(HttpStatusCode.serverError).send()
}

export type Validation = (request: Request) => void

export type ControllerProps = {
  validations?: Validation[]
  permission?: PermissionKey
  mandatoryFields?: string[]
}

export abstract class Controller implements IController {
  protected props: ControllerProps

  constructor(props: ControllerProps) {
    this.props = {
      ...props,
      validations: [
        this.hasPermissions,
        this.includesMandatoryFields,
        ...(props.validations || [])
      ]
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

  abstract exec: (req: Request, res: Response) => Promise<void>

  hasPermissions = (req: Request) => {
    if (!this.permission) return

    const permissionValue = req.user.permissoes[this.permission]
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
