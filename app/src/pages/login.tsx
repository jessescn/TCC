import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Text
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { store, useSelector, actions } from '../store'

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

  const status = useSelector(state => state.session.loginStatus)

  useEffect(() => {
    if (status === 'success') {
      navigate('/home')
    }
  }, [status])

  const handleLoginSubmit = (form: LoginForm) => {
    store.dispatch(actions.session.login(form))
  }

  return (
    <Center
      bgColor="secondary.default"
      w="100vw"
      h="100vh"
      px={{ base: '8px', md: '0' }}
    >
      <Flex
        w="100%"
        maxW="800px"
        bgColor="initial.white"
        borderRadius="8px"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Center
          flexDir={{ base: 'row', md: 'column' }}
          bgColor="primary.dark"
          borderRadius={{ base: '8px 8px 0 0', md: '8px 0 0 8px' }}
          textAlign="center"
          w={{ base: '100%', md: '350px' }}
          p="16px"
        >
          <Image
            src="./logo_ufcg.png"
            maxW={{ base: '100px', md: '150px' }}
            mr="16px"
          />
          <Text
            mt={{ base: '0', md: '24px' }}
            fontWeight="bold"
            fontSize={{ base: '20px', md: '24px' }}
            color="initial.white"
            maxW="200px"
          >
            Sistema de Pós-Graduação UFCG
          </Text>
        </Center>
        <Box>
          <Alert
            borderRadius={{ base: '0', md: '0 8px 0 0' }}
            bgColor="info.warning-light"
          >
            <Box>
              <AlertTitle>Aviso</AlertTitle>
              <AlertDescription fontSize={{ base: '12px', md: '14px' }}>
                Você não está conectado ao sistema. Utilize o formulário abaixo
                para se autenticar
              </AlertDescription>
            </Box>
          </Alert>
          <Box mt="16px" px={{ base: '8px', md: '32px' }}>
            <form onSubmit={handleSubmit(handleLoginSubmit)}>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel fontSize={{ base: '14px', md: '16px' }}>
                  Email
                </FormLabel>
                <Input
                  id="email"
                  placeholder="Ex. email@ccc.ufcg.edu.br"
                  {...register('email', {
                    required: { value: true, message: '*email obrigatório' }
                  })}
                />
                {errors.email && (
                  <Text mt="8px" color="info.error" fontSize="12px">
                    {errors.email?.message}
                  </Text>
                )}
              </FormControl>
              <FormControl mt="12px" isInvalid={Boolean(errors.password)}>
                <FormLabel fontSize={{ base: '14px', md: '16px' }}>
                  Senha
                </FormLabel>
                <Input
                  id="password"
                  placeholder="******"
                  type="password"
                  {...register('password', {
                    required: { value: true, message: '*senha obrigatória' }
                  })}
                />
                {errors.password && (
                  <Text mt="8px" color="info.error" fontSize="12px">
                    {errors.password?.message}
                  </Text>
                )}
              </FormControl>
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
                <RouterLink to="/cadastro">
                  <Link
                    as="p"
                    fontSize="12px"
                    textDecoration="underline"
                    color="primary.default"
                  >
                    Não possui acesso? clique aqui!
                  </Link>
                </RouterLink>
              </Center>
            </form>
          </Box>
        </Box>
      </Flex>
    </Center>
  )
}
