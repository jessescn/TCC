import { PermissionScope } from 'types/auth/actors'
import { BadRequestError, UnauthorizedError } from 'types/express/errors'

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

export const checkPermissionResource = (permission: PermissionScope) => {
  if (permission === 'not_allowed') {
    throw new UnauthorizedError()
  }
}
