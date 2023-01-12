import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { CustomLink } from 'components/atoms/custom-link'
import { SimpleErrorMessage } from 'components/atoms/simple-error-message'
import { Alert } from 'components/molecules/alert'
import FormInput from 'components/molecules/forms/input'
import LogoPanel from 'components/organisms/logo-panel'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthCredentials } from 'services/auth'
import { actions, selectors, store, useSelector } from 'store'

type LoginForm = AuthCredentials

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>()

  const status = useSelector(selectors.session.getAuthStatus)
  const currentUser = useSelector(selectors.session.getCurrentUser)

  useEffect(() => {
    if (status.status === 'success' && currentUser) {
      const redirectTo = currentUser.verificado ? '/' : '/confirmacao-email'

      navigate(redirectTo)
    }
  }, [status])

  const handleLoginSubmit = (form: LoginForm) => {
    store.dispatch(actions.session.login(form))
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
      <Box>
        <Alert borderRadius={{ base: '0', md: '0 0.5rem 0 0' }} title="Aviso">
          <Text>
            Você não está conectado ao sistema. Utilize o formulário abaixo para
            se autenticar
          </Text>
        </Alert>
        <Box p={{ base: '0.5rem', md: '1rem' }}>
          <form
            data-testid="login-form"
            onSubmit={handleSubmit(handleLoginSubmit)}
          >
            <FormInput
              mb="1rem"
              id="email"
              placeholder="Ex. email@ccc.ufcg.edu.br"
              isInvalid={Boolean(errors.email)}
              label={{
                text: 'Email',
                props: {
                  fontSize: { base: 'sm', md: 'md' },
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
              id="senha"
              placeholder="********"
              type="password"
              isInvalid={Boolean(errors.senha)}
              label={{
                text: 'Senha',
                props: {
                  fontSize: { base: 'sm', md: 'md' },
                  htmlFor: 'senha'
                }
              }}
              register={register('senha', {
                required: { value: true, message: '*senha obrigatória' }
              })}
              errors={[
                {
                  text: errors.senha?.message,
                  condition: Boolean(errors.senha)
                }
              ]}
            />
            <Center mt="1rem" flexDir="column">
              <Button isLoading={status.status === 'loading'} type="submit">
                Acessar
              </Button>
              {status.status === 'failure' && (
                <SimpleErrorMessage
                  message={status.message || 'credenciais inválidas!'}
                />
              )}
              <Box mt="0.5rem" textAlign="center">
                <Text fontSize="xs">
                  Não possui conta?
                  <Text
                    as="span"
                    color="primary.dark"
                    fontWeight="bold"
                    ml="0.25rem"
                    _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                    onClick={() => navigate('/cadastro')}
                  >
                    Crie agora
                  </Text>
                </Text>
                <Text fontSize="xs">
                  Esqueceu sua senha?
                  <Text
                    as="span"
                    color="primary.dark"
                    fontWeight="bold"
                    ml="0.25rem"
                    _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                    onClick={() => navigate('/alteracao-senha')}
                  >
                    Altere aqui
                  </Text>
                </Text>
              </Box>
            </Center>
          </form>
        </Box>
      </Box>
    </Flex>
  )
}
