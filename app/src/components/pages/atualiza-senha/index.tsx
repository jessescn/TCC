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
import LogoPanel from 'components/organisms/logo-panel'
import { useEffect, useState } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { actions, store, useSelector } from 'store'

export const Content = () => {
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

  return (
    <Flex
      w="100%"
      maxW="800px"
      minH="200px"
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
          Atualização Senha
        </Text>
        <Text fontSize="14px">
          Insira uma nova senha de acesso para o email{' '}
          <Text as="span" fontWeight="bold">
            {email}.
          </Text>
          .
        </Text>
        <Box my="16px">
          <Text fontSize="14px" fontWeight="bold" mb="8px">
            Nova Senha
          </Text>
          <Input
            type="password"
            color="initial.black"
            size="sm"
            placeholder="Insira seu email"
            borderColor="secondary.dark"
            _placeholder={{ color: 'secondary.dark' }}
            onChange={ev => setSenha(ev.target.value)}
          />
          <PasswordStrengthBar
            key="password-strenght"
            style={{ marginTop: '10px' }}
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
        <Box mb="16px">
          <Text fontSize="14px" fontWeight="bold" mb="8px">
            Confirmar Nova Senha
          </Text>
          <Input
            type="password"
            color="initial.black"
            size="sm"
            placeholder="Insira seu email"
            borderColor="secondary.dark"
            _placeholder={{ color: 'secondary.dark' }}
            onChange={ev => setConfrmaSenha(ev.target.value)}
          />
          {!passwordsMatches && (
            <Text fontSize="12px" mt="4px" color="info.error">
              As senhas não correspondem
            </Text>
          )}
        </Box>
        <Center flexDir="column">
          <Button
            isDisabled={!canUpdate}
            onClick={handleUpdatePassword}
            isLoading={status.status === 'loading'}
            bgColor={'primary.dark'}
            color={'initial.white'}
            borderColor={'initial.white'}
            borderWidth="2px"
            _hover={{
              bgColor: 'primary.dark',
              color: 'initial.white'
            }}
          >
            Atualizar Senha
          </Button>
          {status.status === 'failure' && (
            <Alert
              fontSize="14px"
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
