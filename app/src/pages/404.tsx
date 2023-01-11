import { Center, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import Lottie from 'react-lottie'
import animationData from 'animations/404.json'
import { useNavigate } from 'react-router-dom'
import { Button } from 'components/atoms/button'

export default function NotFound() {
  const navigate = useNavigate()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Screen height="100vh">
      <Center height="100%" w="100%" flexDir="column">
        <Lottie options={defaultOptions} height={300} width={400} />
        <Text fontSize="xl" fontWeight="bold" color="primary.default">
          página não encontrada
        </Text>
        <Button
          bgColor="primary.default"
          mt="1rem"
          onClick={() => navigate('/')}
        >
          Me tire daqui
        </Button>
      </Center>
    </Screen>
  )
}
