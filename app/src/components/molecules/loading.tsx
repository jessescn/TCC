import { Flex, Spinner } from '@chakra-ui/react'

export const LoadingPage = () => {
  return (
    <Flex w="100%" h="100%" maxW="900px" flexDir="column">
      <Spinner />
    </Flex>
  )
}
