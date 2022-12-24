import { Text } from '@chakra-ui/react'

type Props = {
  message: string
}

export const SimpleErrorMessage = ({ message }: Props) => {
  return (
    <Text fontSize="xs" color="info.error" mt="0.25rem">
      {message}
    </Text>
  )
}
