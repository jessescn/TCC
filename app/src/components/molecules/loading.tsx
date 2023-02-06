import { Box, Center, Spinner, Text } from '@chakra-ui/react'
import animationData from 'animations/loading.json'
import Lottie from 'react-lottie'

type Props = {
  default?: boolean
}

export const LoadingPage = (props: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Center
      w="100%"
      h={!props.default ? 'calc(100vh - 108px)' : '100%'}
      py="1.5rem"
    >
      {props.default ? (
        <Spinner />
      ) : (
        <Box>
          <Lottie options={defaultOptions} height={100} width={100} />
          <Text fontSize="sm">
            Carregando conteúdo... Pode demorar um pouco
          </Text>
        </Box>
      )}
    </Center>
  )
}
