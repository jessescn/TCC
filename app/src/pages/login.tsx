import { Box, Button, Center, Flex, Text } from '@chakra-ui/react'
import Link from 'components/atoms/link'
import Screen from 'components/atoms/screen'
import Alert from 'components/molecules/alert'
import FormInput from 'components/molecules/forms/input'
import LogoPanel from 'components/organisms/logo-panel'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector, selectors } from '../store'

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>()

  const status = useSelector(selectors.session.getAuthStatus)

  useEffect(() => {
    if (status === 'success') {
      navigate('/')
    }
  }, [status])

  const handleLoginSubmit = (form: LoginForm) => {
    store.dispatch(actions.session.login(form))
  }

  return (
    <Screen noHeader>
      <Flex
        w="100%"
        maxW="800px"
        bgColor="initial.white"
        borderRadius="8px"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <LogoPanel side="left" />
        <Box>
          <Alert borderRadius={{ base: '0', md: '0 8px 0 0' }} title="Aviso">
            <Text>
              Você não está conectado ao sistema. Utilize o formulário abaixo
              para se autenticar
            </Text>
          </Alert>
          <Box mt="16px" px={{ base: '8px', md: '32px' }}>
            <form
              data-testid="login-form"
              onSubmit={handleSubmit(handleLoginSubmit)}
            >
              <FormInput
                id="email"
                placeholder="Ex. email@ccc.ufcg.edu.br"
                isInvalid={Boolean(errors.email)}
                label={{
                  text: 'Email',
                  props: {
                    fontSize: { base: '14px', md: '16px' },
                    htmlFor: 'email'
                  }
                }}
                register={register('email', {
                  required: { value: true, message: '*email obrigatório' }
                })}
                errors={[
                  {
                    text: errors.email?.message,
                    condition: Boolean(errors.email)
                  }
                ]}
              />
              <FormInput
                mt="12px"
                id="password"
                placeholder="******"
                type="password"
                isInvalid={Boolean(errors.password)}
                label={{
                  text: 'Senha',
                  props: {
                    fontSize: { base: '14px', md: '16px' },
                    htmlFor: 'password'
                  }
                }}
                register={register('password', {
                  required: { value: true, message: '*senha obrigatória' }
                })}
                errors={[
                  {
                    text: errors.password?.message,
                    condition: Boolean(errors.password)
                  }
                ]}
              />
              <Center mt="32px" flexDir="column" mb="16px">
                <Button
                  isLoading={status === 'loading'}
                  type="submit"
                  color="initial.white"
                  bgColor="primary.dark"
                  mb="8px"
                  _hover={{ bgColor: 'primary.default' }}
                  fontSize={{ base: '14px', md: '16px' }}
                >
                  Acessar
                </Button>
                {status === 'failure' && (
                  <Text mt="8px" color="info.error" fontSize="12px">
                    credenciais inválidas!
                  </Text>
                )}
                <Link redirectTo="/cadastro">
                  Não possui acesso? clique aqui!
                </Link>
              </Center>
            </form>
          </Box>
        </Box>
      </Flex>
    </Screen>
  )
}
