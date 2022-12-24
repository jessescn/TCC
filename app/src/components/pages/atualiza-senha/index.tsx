import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Center,
  Flex,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import LogoPanel from 'components/organisms/logo-panel'
import { useEffect, useState } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

export default function AlteracaoSenhaCodigo() {
  const navigate = useNavigate()
  const { code } = useParams()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const [senha, setSenha] = useState('')
  const [strong, setStrong] = useState(0)
  const [confirmaSenha, setConfrmaSenha] = useState('')

  const status = useSelector(state => state.user.updatePasswordStatus)
  const passwordsMatches = senha === confirmaSenha

  const canUpdate = passwordsMatches && !!code && strong >= 2

  const handleUpdatePassword = () => {
    if (passwordsMatches && code) {
      store.dispatch(actions.user.updatePassword({ code, password: senha }))
    }
  }

  useEffect(() => {
    if (status.status === 'success') {
      store.dispatch(actions.session.logout({ reload: false }))
      navigate('/login')
    }
  }, [status])

  return !email ? null : (
    <Flex
      w="100%"
      maxW="800px"
      minH="200px"
      bgColor="initial.white"
      borderRadius="lg"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <LogoPanel side="left" />
      <Box p="1rem" maxW="500px">
        <Text fontWeight="bold" fontSize={{ base: 'md', md: 'xl' }} mb="1rem">
          Atualização Senha
        </Text>
        <Text fontSize="sm">
          Insira uma nova senha de acesso para o email{' '}
          <Text as="span" fontWeight="bold">
            {email}
          </Text>
        </Text>
        <Stack spacing="1rem" my="1rem">
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb="0.5rem">
              Nova Senha
            </Text>
            <Input
              size="sm"
              type="password"
              color="initial.black"
              borderRadius="md"
              placeholder="Insira seu email"
              borderColor="secondary.dark"
              _placeholder={{ color: 'secondary.dark' }}
              onChange={ev => setSenha(ev.target.value)}
            />
            <PasswordStrengthBar
              key="password-strenght"
              style={{ marginTop: '0.5rem' }}
              password={senha}
              scoreWords={[
                'muito fraco',
                'fraco',
                'mediano',
                'forte',
                'muito forte'
              ]}
              shortScoreWord="senha muito curta"
              minLength={8}
              onChangeScore={a => setStrong(a)}
            />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb="0.5rem">
              Confirmar Nova Senha
            </Text>
            <Input
              size="sm"
              type="password"
              color="initial.black"
              borderRadius="md"
              placeholder="Insira seu email"
              borderColor="secondary.dark"
              _placeholder={{ color: 'secondary.dark' }}
              onChange={ev => setConfrmaSenha(ev.target.value)}
            />
            {!passwordsMatches && (
              <Text fontSize="xs" mt="0.5rem" color="info.error">
                As senhas não correspondem
              </Text>
            )}
          </Box>
        </Stack>
        <Center flexDir="column">
          <Button
            size="sm"
            isDisabled={!canUpdate}
            onClick={handleUpdatePassword}
            isLoading={status.status === 'loading'}
          >
            Atualizar Senha
          </Button>
          {status.status === 'failure' && (
            <Alert
              fontSize="sm"
              status="error"
              borderRadius={{ base: '0', md: '0 8px 0 0' }}
            >
              <AlertIcon />
              <AlertDescription>
                {status.message || 'Erro ao atualizar a senha'}
              </AlertDescription>
            </Alert>
          )}
        </Center>
      </Box>
    </Flex>
  )
}
