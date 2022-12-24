import { Center, Spinner } from '@chakra-ui/react'

export const LoadingPage = () => {
  return (
    <Center w="100%" h="100%" py="1.5rem">
      <Spinner />
    </Center>
  )
}
