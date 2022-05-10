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
import { useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router-dom'

type RegisterForm = {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>()

  const handleRegisterSubmit = (form: RegisterForm) => {
    console.log(form)
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
              <Text
                mt="8px"
                color="info.error"
                hidden={!errors.name}
                fontSize="12px"
              >
                {errors.name?.message}
              </Text>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.email)} mt="12px">
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
              <Text
                mt="8px"
                color="info.error"
                hidden={!errors.email}
                fontSize="12px"
              >
                {errors.email?.message}
              </Text>
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
              <Text
                mt="8px"
                color="info.error"
                hidden={!errors.password}
                fontSize="12px"
              >
                {errors.password?.message}
              </Text>
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
                  required: true
                })}
              />
              <Text
                mt="8px"
                color="info.error"
                hidden={!errors.confirmPassword}
                fontSize="12px"
              >
                {errors.confirmPassword?.message}
              </Text>
            </FormControl>
            <Center mt="32px" flexDir="column" mb="16px">
              <Button
                type="submit"
                color="initial.white"
                bgColor="primary.dark"
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
