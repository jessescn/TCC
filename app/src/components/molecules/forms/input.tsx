import { FormLabelProps, Input, InputProps, StyleProps } from '@chakra-ui/react'
import { SimpleErrorMessage } from 'components/atoms/simple-error-message'
import { ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import FormControl from './control'

export type ErrorText = {
  text?: string
  style?: StyleProps
  condition: boolean
}

type Props = InputProps & {
  label: {
    text: ReactNode
    props?: FormLabelProps
  }
  register?: UseFormRegisterReturn
  errors?: ErrorText[]
}

const FormInput = ({ label, errors = [], register, ...inputProps }: Props) => {
  return (
    <FormControl label={label.text} {...label.props}>
      <Input
        color="initial.black"
        borderColor="secondary.dark"
        _placeholder={{ color: 'secondary.dark' }}
        {...register}
        {...inputProps}
      />
      {errors.map(error => {
        return !error.condition ? null : (
          <SimpleErrorMessage key={error.text} message={error.text || ''} />
        )
      })}
    </FormControl>
  )
}

export default FormInput
