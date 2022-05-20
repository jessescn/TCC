import {
  FormLabelProps,
  Input,
  InputProps,
  StyleProps,
  Text
} from '@chakra-ui/react'
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
    style?: FormLabelProps
  }
  register?: UseFormRegisterReturn
  errors?: ErrorText[]
}

const FormInput = ({ label, errors = [], register, ...inputProps }: Props) => {
  return (
    <FormControl label={label.text} {...label.style}>
      <Input {...register} {...inputProps} />
      {errors.map(error => {
        return !error.condition ? null : (
          <Text mt="8px" color="info.error" fontSize="12px" {...error.style}>
            {error.text}
          </Text>
        )
      })}
    </FormControl>
  )
}

export default FormInput
