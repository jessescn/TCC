import {
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
import { CreateUser } from '../services/user'
import { actions, store, useSelector } from '../store'
import { validateEmail } from '../utils/validation'

type RegisterForm = CreateUser & {
  confirmPassword: string
}

export default function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<RegisterForm>({ mode: 'onSubmit', reValidateMode: 'onChange' })

  const status = useSelector(state => state.user.createUserStatus)

  const handleRegisterSubmit = (form: RegisterForm) => {
    store.dispatch(actions.user.create(form))
  }

  useEffect(() => {
    if (status === 'success') {
      navigate('/login')
    }
  }, [status])

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
        flexDirection={{ base: 'column-reverse', md: 'row' }}
      >
        <Box
          mt="16px"
          w={{ base: '100%', md: '470px' }}
          px={{ base: '8px', md: '32px' }}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: '16px', md: '20px' }}
            mb="16px"
          >
            Cadastro
          </Text>
          <form onSubmit={handleSubmit(handleRegisterSubmit)}>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel fontSize={{ base: '14px', md: '16px' }}>
                Nome Completo
              </FormLabel>
              <Input
                id="name"
                placeholder="Ex. João da Silva"
                {...register('name', {
                  required: { value: true, message: '*nome obrigatório' }
                })}
              />
              {errors.name && (
                <Text mt="8px" color="info.error" fontSize="12px">
                  {errors.name?.message}
                </Text>
              )}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.email)} mt="12px">
              <FormLabel fontSize={{ base: '14px', md: '16px' }}>
                Email
              </FormLabel>
              <Input
                id="email"
                placeholder="Ex. email@ccc.ufcg.edu.br"
                {...register('email', {
                  required: { value: true, message: '*email obrigatório' },
                  validate: (value: string) => {
                    return validateEmail(value)
                  }
                })}
              />
              {errors.email && (
                <Text mt="8px" color="info.error" fontSize="12px">
                  {errors.email?.message}
                </Text>
              )}
              {errors.email && errors.email.type === 'validate' && (
                <Text mt="8px" color="info.error" fontSize="12px">
                  email inválido
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
            <FormControl mt="12px" isInvalid={Boolean(errors.confirmPassword)}>
              <FormLabel fontSize={{ base: '14px', md: '16px' }}>
                Confirmar Senha
              </FormLabel>
              <Input
                id="confirmPassword"
                placeholder="******"
                type="password"
                {...register('confirmPassword', {
                  required: true,
                  validate: (value: string) => {
                    const password = getValues('password')

                    return value === password
                  }
                })}
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === 'validate' && (
                  <Text mt="8px" color="info.error" fontSize="12px">
                    as senhas não correspondem
                  </Text>
                )}
            </FormControl>
            <Center mt="32px" flexDir="column" mb="16px">
              <Button
                type="submit"
                color="initial.white"
                bgColor="primary.dark"
                isLoading={status === 'loading'}
                mb="8px"
                _hover={{ bgColor: 'primary.default' }}
                fontSize={{ base: '14px', md: '16px' }}
              >
                Cadastrar
              </Button>
              <RouterLink to="/login">
                <Link
                  as="p"
                  fontSize="12px"
                  textDecoration="underline"
                  color="primary.default"
                >
                  já possuo conta!
                </Link>
              </RouterLink>
            </Center>
          </form>
        </Box>
        <Center
          flexDir={{ base: 'row', md: 'column' }}
          bgColor="primary.dark"
          borderRadius={{ base: '8px 8px 0 0', md: '0 8px 8px 0' }}
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
      </Flex>
    </Center>
  )
}
