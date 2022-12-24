import {
  Box,
  Center,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Link
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import LogoPanel from 'components/organisms/logo-panel'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function ConfirmacaoEmail() {
  const navigate = useNavigate()
  const [sended, setSended] = useState(false)

  const currentUser = useSelector(selectors.session.getCurrentUser)
  const status = useSelector(state => state.session.sendEmailStatus)

  const handleSendEmail = () => {
    setSended(false)
    store.dispatch(actions.session.sendEmailConfirmation())
  }

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (status === 'success') {
      setSended(true)
    }
  }, [status])

  const handleRedirect = () => {
    store.dispatch(actions.session.logout({ reload: false }))
    navigate('/login')
  }

  return (
    <Flex
      w="100%"
      maxW="800px"
      bgColor="initial.white"
      borderRadius="lg"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <LogoPanel side="left" />
      <Box p={4}>
        <Text fontWeight="bold" fontSize={{ base: 'md', md: 'xl' }} mb="1rem">
          Confirmação Email
        </Text>
        <Text fontSize="sm">
          Para acessar o sistema, é necessário confirmar o seu email. Ao clicar
          no botão abaixo será enviado um email para{' '}
          <Text as="span" fontWeight="bold">
            {currentUser?.email}.
          </Text>
        </Text>
        <Center flexDirection="column" my="2rem">
          <Button
            onClick={handleSendEmail}
            isLoading={status === 'loading'}
            isDisabled={currentUser?.verificado}
            bgColor={sended ? 'initial.white' : 'primary.dark'}
            color={sended ? 'primary.dark' : 'initial.white'}
            borderColor={sended ? 'primary.dark' : 'initial.white'}
            borderWidth="2px"
            _hover={{
              bgColor: 'primary.dark',
              color: 'initial.white'
            }}
          >
            {sended ? 'Enviar novamente' : 'Enviar email verificação'}
          </Button>
          {sended && (
            <Text fontSize="sm" fontWeight="bold">
              O link enviado irá se expirar em{' '}
              <Text as="span" color="info.error">
                5 minutos
              </Text>
            </Text>
          )}
        </Center>
        {status === 'failure' && (
          <Alert
            fontSize="sm"
            status="error"
            borderRadius={{ base: '0', md: '0 8px 0 0' }}
          >
            <AlertIcon />
            <AlertDescription>
              Erro ao enviar email, tente novamente em alguns instantes
            </AlertDescription>
          </Alert>
        )}
        <Center>
          <Link
            fontSize="sm"
            onClick={handleRedirect}
            style={{ textDecoration: 'underline' }}
          >
            Voltar para o login
          </Link>
        </Center>
      </Box>
    </Flex>
  )
}
