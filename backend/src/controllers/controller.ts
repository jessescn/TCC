/* eslint-disable camelcase */
import { PermissionKey, Scope } from 'domain/profiles'
import { HttpStatusCode, Request, Response } from 'types/express'
import { RequestError, UnauthorizedError } from 'types/express/errors'
import { UseCase } from 'usecases'
import { validateMandatoryFields } from 'utils/fields'

export type Validation = (request: Request) => void

export type ControllerProps<T = any> = {
  validations: Validation[]
  permission?: PermissionKey
  mandatoryFields: string[]
  usecase: UseCase<T>
}

export class Controller {
  protected props: ControllerProps

  constructor(props: ControllerProps) {
    const defaultValidations = [
      this.hasPermissions,
      this.includesMandatoryFields
    ]

    this.props = {
      ...props,
      mandatoryFields: props.mandatoryFields,
      validations: [...defaultValidations, ...props.validations]
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

  get usecase() {
    return this.props.usecase
  }

  private errorResponseHandler = (res: Response, error: any) => {
    console.error(error)

    if (error instanceof RequestError) {
      return res.status(error.status).send(error.message)
    }

    return res.status(HttpStatusCode.serverError).send()
  }

  private hasPermissions = (request: Request) => {
    if (!this.permission) return

    const { actor } = request
    const permissions = actor?.profile?.permissoes || {}

    const permission = permissions[this.permission] as Scope

    if (!permission) {
      throw new UnauthorizedError()
    }
  }

  private includesMandatoryFields = (req: Request) => {
    if (this.mandatoryFields.length === 0) return

    validateMandatoryFields(this.mandatoryFields, req.body)
  }

  private executeRequestValidations = (req: Request) => {
    this.validations.forEach(validation => validation(req))
  }

  exec = async (request: Request, response: Response) => {
    try {
      this.executeRequestValidations(request)

      const result = await this.usecase.execute(request)

      return response.json(result)
    } catch (error) {
      return this.errorResponseHandler(response, error)
    }
  }
}
