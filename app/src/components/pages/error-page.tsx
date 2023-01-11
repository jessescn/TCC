import { Center, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { useNavigate } from 'react-router-dom'
import Lottie from 'react-lottie'
import animationData from 'animations/404.json'

export const ErrorPage = () => {
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
    <Center h="80vh" w="100%" flexDir="column">
      <Lottie options={defaultOptions} height={400} width={400} />
      <Text mt="8px" mb="24px" fontSize="28px">
        Erro ao acessar recurso
      </Text>
      <Button onClick={() => navigate(-1)}>Voltar</Button>
    </Center>
  )
}
