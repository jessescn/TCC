import { Center, Icon, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { AiOutlineRobot } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Center h="80vh" w="100%" flexDir="column">
      <Icon as={AiOutlineRobot} boxSize={24} />
      <Text mt="8px" mb="24px" fontSize="28px">
        Erro ao acessar recurso
      </Text>
      <Button onClick={() => navigate(-1)}>Voltar</Button>
    </Center>
  )
}
