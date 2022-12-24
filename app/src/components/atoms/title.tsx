import { Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const Title = ({ children }: Props) => {
  return (
    <Text fontWeight="bold" fontSize="3xl" color="primary.dark">
      {children}
    </Text>
  )
}
