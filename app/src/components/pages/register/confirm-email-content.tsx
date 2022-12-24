import { Box, Center, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { useNavigate } from 'react-router-dom'

export default function ConfirmEmailContent() {
  const navigate = useNavigate()

  return (
    <Box w={{ base: '100%', md: '470px' }} p={{ base: '0.5rem', md: '1.5rem' }}>
      <Center height="100%" flexDir="column" textAlign="center">
        <Text color="info.success" fontWeight="bold" fontSize="2xl">
          Usuário criado com sucesso!
        </Text>
        <Text fontSize="sm" my="1rem">
          Antes de poder acessar a plataforma, é necessário confirmar o email
          cadastrado.
          <Text as="span" fontWeight="bold">
            Acesse o email fornecido e clique no link enviado para confirmar sua
            conta.
          </Text>
        </Text>
        <Button onClick={() => navigate('/login')}>Voltar ao login</Button>
      </Center>
    </Box>
  )
}
