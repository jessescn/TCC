import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormLabelProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = FormLabelProps & {
  label: ReactNode
  children: ReactNode
  isInvalid?: boolean
}

const FormControl = ({ label, children, isInvalid, ...labelProps }: Props) => {
  return (
    <ChakraFormControl isInvalid={isInvalid}>
      <ChakraFormLabel {...labelProps}>{label}</ChakraFormLabel>
      {children}
    </ChakraFormControl>
  )
}

export default FormControl
