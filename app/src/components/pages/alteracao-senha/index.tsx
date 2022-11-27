import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Center,
  Flex,
  Input,
  Text
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import Link from 'components/atoms/link'
import LogoPanel from 'components/organisms/logo-panel'
import { useEffect, useState } from 'react'
import { actions, store, useSelector } from 'store'
import { validateEmail } from 'utils/validation'

export const Content = () => {
  const [email, setEmail] = useState('')
  const [sended, setSended] = useState(false)

  const isValid = validateEmail(email)
  const shouldShowErrorMessage = !isValid && email.trim().length > 0

  const status = useSelector(state => state.user.changePasswordEmailStatus)

  const handleSendEmail = () => {
    if (isValid) {
      store.dispatch(actions.user.changePasswordEmail(email))
    }
  }

  useEffect(() => {
    if (status.status === 'success') {
      setSended(true)
    }
  }, [status])

  return (
    <Flex
      w="100%"
      maxW="800px"
      bgColor="initial.white"
      borderRadius="8px"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <LogoPanel side="left" />
      <Box p={4} maxW="500px">
        <Text
          fontWeight="bold"
          fontSize={{ base: '16px', md: '20px' }}
          mb="16px"
        >
          Alteração Senha
        </Text>
        <Text fontSize="14px">
          Insira abaixo o email relacionado a sua conta. Ao clicar em enviar
          email, será enviado um link para alteração de senha. Caso não tenha
          mais acesso ao seu email, contate a coordenação de pós-graduação.
        </Text>
        <Box my="16px">
          <Text fontSize="14px" fontWeight="bold" mb="8px">
            Seu Email
          </Text>
          <Input
            color="initial.black"
            size="sm"
            placeholder="Insira seu email"
            borderColor="secondary.dark"
            _placeholder={{ color: 'secondary.dark' }}
            onChange={ev => setEmail(ev.target.value)}
          />
          {shouldShowErrorMessage && (
            <Text fontSize="12px" mt="4px" color="info.error">
              Email inválido
            </Text>
          )}
        </Box>
        <Center flexDir="column">
          <Button
            onClick={handleSendEmail}
            isLoading={status.status === 'loading'}
            bgColor={sended ? 'initial.white' : 'primary.dark'}
            color={sended ? 'primary.dark' : 'initial.white'}
            borderColor={sended ? 'primary.dark' : 'initial.white'}
            isDisabled={!isValid}
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
          {status.status === 'failure' && (
            <Alert
              fontSize="14px"
              status="error"
              borderRadius={{ base: '0', md: '0 8px 0 0' }}
            >
              <AlertIcon />
              <AlertDescription>
                {status.message || 'Erro ao enviar email'}
              </AlertDescription>
            </Alert>
          )}
          <Link redirectTo="/login">Voltar ao login</Link>
        </Center>
      </Box>
    </Flex>
  )
}
