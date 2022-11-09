import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../error-message'

type Props = {
  children: ReactNode
  fieldName: string
}

export const ErrorWrapper = ({ children, fieldName }: Props) => {
  const {
    formState: { errors }
  } = useFormContext()

  return (
    <Box>
      {children}
      <ErrorMessage errors={errors} fieldName={fieldName} />
    </Box>
  )
}
