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

export const Content = () => {
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
      borderRadius="8px"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <LogoPanel side="left" />
      <Box p={4}>
        <Text
          fontWeight="bold"
          fontSize={{ base: '16px', md: '20px' }}
          mb="16px"
        >
          Confirmação Email
        </Text>
        <Text>
          Para acessar o sistema, é necessário confirmar o seu email. Ao clicar
          no botão abaixo será enviado um email para{' '}
          <Text as="span" fontWeight="bold">
            {currentUser?.email}.
          </Text>
        </Text>
        <Center flexDirection="column" h="50%" my="16px">
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
            {sended ? 'Enviar Novamente' : 'Enviar Email'}
          </Button>
          {sended && (
            <Text fontSize="14px" fontWeight="bold">
              O link enviado irá se expirar em{' '}
              <Text as="span" color="info.error">
                5 minutos
              </Text>
            </Text>
          )}
        </Center>
        {status === 'failure' && (
          <Alert
            fontSize="14px"
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
          <Link onClick={handleRedirect}>Voltar para o login</Link>
        </Center>
      </Box>
    </Flex>
  )
}
