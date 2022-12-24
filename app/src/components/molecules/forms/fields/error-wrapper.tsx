import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { SimpleErrorMessage } from '../../../atoms/simple-error-message'

type Props = {
  children: ReactNode
  isInvalid: boolean
  message?: string
}

export const ErrorWrapper = ({ children, isInvalid, message }: Props) => {
  return (
    <Box>
      {children}
      {isInvalid && (
        <SimpleErrorMessage message={message || 'Campo inválido'} />
      )}
    </Box>
  )
}
