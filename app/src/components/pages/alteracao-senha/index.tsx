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
import { CustomLink } from 'components/atoms/custom-link'
import { SimpleErrorMessage } from 'components/atoms/simple-error-message'
import LogoPanel from 'components/organisms/logo-panel'
import { useEffect, useState } from 'react'
import { actions, store, useSelector } from 'store'
import { validateEmail } from 'utils/validation'

export default function AlteracaoSenha() {
  const [email, setEmail] = useState('')
  const [hasSended, setHasSended] = useState(false)

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
      setHasSended(true)
    }
  }, [status])

  return (
    <Flex
      w="100%"
      maxW="800px"
      bgColor="initial.white"
      borderRadius="lg"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <LogoPanel side="left" />
      <Box p="1rem" maxW={{ base: '100%', md: '500px' }}>
        <Text
          fontWeight="bold"
          fontSize="xl"
          mb={{ base: '0.5rem', md: '1rem' }}
        >
          Alteração Senha
        </Text>
        <Text fontSize="sm">
          Insira abaixo o email relacionado a sua conta. Ao clicar em enviar
          email, será enviado um link para alteração de senha. Caso não tenha
          mais acesso ao seu email, contate a coordenação de pós-graduação.
        </Text>
        <Input
          color="initial.black"
          size="sm"
          mt="1rem"
          mb="0.25rem"
          placeholder="Insira seu email"
          borderColor="secondary.dark"
          _placeholder={{ color: 'secondary.dark' }}
          onChange={ev => setEmail(ev.target.value)}
        />
        <Box h="1rem">
          {shouldShowErrorMessage && (
            <SimpleErrorMessage message="Email inválido" />
          )}
        </Box>
        <Center flexDir="column">
          <Button
            onClick={handleSendEmail}
            isLoading={status.status === 'loading'}
            bgColor={hasSended ? 'initial.white' : 'primary.dark'}
            color={hasSended ? 'primary.dark' : 'initial.white'}
            borderColor={hasSended ? 'primary.dark' : 'initial.white'}
            isDisabled={!isValid}
            borderWidth="2px"
            _hover={{
              bgColor: 'primary.dark',
              color: 'initial.white'
            }}
          >
            {hasSended ? 'Enviar Novamente' : 'Enviar Email'}
          </Button>
          {hasSended && (
            <Text fontSize="sm" fontWeight="bold">
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
          <CustomLink redirectTo="/login" mt="0.5rem">
            Voltar ao login
          </CustomLink>
        </Center>
      </Box>
    </Flex>
  )
}
