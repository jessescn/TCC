import { Request } from 'types/express'
import { BadRequestError } from 'types/express/errors'
import { isNumber } from 'utils/value'
import { checkIncludesInvalidFields } from 'utils/fields'

export const hasNumericId = (req: Request) => {
  const { id } = req.params

  if (!isNumber(id)) {
    throw new BadRequestError()
  }
}

export const notIncludesInvalidFields = (
  req: Request,
  validFields: string[]
) => {
  const includesInvalidFields = checkIncludesInvalidFields(
    validFields,
    req.body
  )

  if (includesInvalidFields) {
    throw new BadRequestError()
  }
}
