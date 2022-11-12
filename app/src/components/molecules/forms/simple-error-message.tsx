import { Text } from '@chakra-ui/react'

type Props = {
  message: string
}

export const SimpleErrorMessage = ({ message }: Props) => {
  return (
    <Text mt="6px" fontSize="10px" color="#E53E3E">
      {message}
    </Text>
  )
}
