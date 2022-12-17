import { Box, Center, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { useNavigate } from 'react-router-dom'

export default function ConfirmEmailContent() {
  const navigate = useNavigate()

  return (
    <Box
      mt="16px"
      w={{ base: '100%', md: '470px' }}
      px={{ base: '8px', md: '32px' }}
    >
      <Center height="100%" flexDir="column" textAlign="center">
        <Text color="info.success" fontWeight="bold" fontSize="24px" mb="16px">
          Usuário criado com sucesso!
        </Text>
        <Text fontSize="14px">
          Antes de poder acessar a plataforma, é necessário confirmar o email
          cadastrado.
          <Text as="span" fontWeight="bold">
            Acesse o email fornecido e clique no link enviado para confirmar sua
            conta.
          </Text>
        </Text>
        <Box mt="16px">
          <Button onClick={() => navigate('/login')}>Voltar ao login</Button>
        </Box>
      </Center>
    </Box>
  )
}
