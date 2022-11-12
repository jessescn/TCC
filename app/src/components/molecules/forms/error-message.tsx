import { SimpleErrorMessage } from './simple-error-message'

type Props = {
  fieldName: string
  errors: {
    [x: string]: any
  }
}

export const ErrorMessage = ({ errors, fieldName }: Props) => {
  return !errors[fieldName] ? null : (
    <SimpleErrorMessage message={errors?.[fieldName]?.message} />
  )
}
