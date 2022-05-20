import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  StyleProps
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = StyleProps & {
  label: ReactNode
  children: ReactNode
  isInvalid?: boolean
}

const FormLabel = ({ label, children, isInvalid, ...styleProps }: Props) => {
  return (
    <ChakraFormControl isInvalid={isInvalid}>
      <ChakraFormLabel {...styleProps}>{label}</ChakraFormLabel>
      {children}
    </ChakraFormControl>
  )
}

export default FormLabel
