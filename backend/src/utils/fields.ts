import { BadRequestError } from 'types/express/errors'

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

export const checkIncludesInvalidFields = (fields: string[], data: any) => {
  let hasInvalidFields = false
  Object.keys(data).forEach(key => {
    if (!fields.includes(key)) {
      hasInvalidFields = true
    }
  })

  return hasInvalidFields
}
