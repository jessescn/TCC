import { Box } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'

export default function Home() {
  return (
    <Screen py="24px">
      <Box
        w="100%"
        h="100%"
        maxW="1392px"
        bgColor="initial.white"
        borderRadius="8px"
        px="24px"
        py="32px"
      ></Box>
    </Screen>
  )
}
