import { Center, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'

export default function NotFound() {
  return (
    <Screen height="100vh">
      <Center height="100%" flexDir="column">
        <Text fontSize="10vh" color="primary.default">
          404
        </Text>
        <Text fontSize="2vh" color="primary.default">
          página não encontrada
        </Text>
      </Center>
    </Screen>
  )
}
