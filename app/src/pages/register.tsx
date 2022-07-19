import { Box, Button, Center, Flex, Link, Text } from '@chakra-ui/react'
import Screen from 'components/atoms/screen'
import FormInput, { ErrorText } from 'components/molecules/forms/input'
import LogoPanel from 'components/organisms/logo-panel'
import { HTMLInputTypeAttribute, useEffect } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { CreateUser } from 'services/user'
import { actions, store, useSelector, selectors } from 'store'
import { validateEmail } from 'utils/validation'

type fieldProps = {
  id: string
  type?: HTMLInputTypeAttribute
  invalid: boolean
  placeholder: string
  label: string
  register: UseFormRegisterReturn
  errors: ErrorText[]
}

export type RegisterForm = CreateUser & {
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

  const status = useSelector(selectors.user.getCreateUserStatus)

  const handleRegisterSubmit = (form: RegisterForm) => {
    store.dispatch(actions.user.create(form))
  }

  useEffect(() => {
    if (status === 'success') {
      navigate('/login')
    }
  }, [status])

  const nameProps: fieldProps = {
    invalid: Boolean(errors.name),
    id: 'name',
    placeholder: 'Ex. João da Silva',
    label: 'Nome Completo',
    register: register('name', {
      required: { value: true, message: '*campo obrigatório' }
    }),
    errors: [{ text: errors.name?.message, condition: Boolean(errors.name) }]
  }

  const emailProps: fieldProps = {
    invalid: Boolean(errors.email),
    id: 'email',
    placeholder: 'Ex. email@ccc.ufcg.edu.br',
    label: 'Email',
    register: register('email', {
      required: { value: true, message: '*campo obrigatório' },
      validate: (value: string) => {
        return validateEmail(value)
      }
    }),
    errors: [
      {
        text: errors.email?.message,
        condition: Boolean(errors.email)
      },
      {
        text: 'email inválido',
        condition: Boolean(errors.email && errors.email.type === 'validate')
      }
    ]
  }

  const passwordProps: fieldProps = {
    invalid: Boolean(errors.password),
    id: 'password',
    placeholder: '******',
    type: 'password',
    label: 'Senha',
    register: register('password', {
      required: { value: true, message: '*campo obrigatório' }
    }),
    errors: [
      { text: errors.password?.message, condition: Boolean(errors.password) }
    ]
  }

  const confirmPasswordProps: fieldProps = {
    invalid: Boolean(errors.confirmPassword),
    id: 'confirmPassword',
    placeholder: '******',
    type: 'password',
    label: 'Confirmar Senha',
    register: register('confirmPassword', {
      required: { value: true, message: '*campo obrigatório' },
      validate: (value: string) => {
        const password = getValues('password')

        return value === password
      }
    }),
    errors: [
      {
        text: errors.confirmPassword?.message,
        condition: Boolean(errors.confirmPassword)
      },
      {
        text: 'as senhas não correspondem',
        condition: Boolean(
          errors.confirmPassword && errors.confirmPassword.type === 'validate'
        )
      }
    ]
  }

  const formFields = [
    nameProps,
    emailProps,
    passwordProps,
    confirmPasswordProps
  ]

  return (
    <Screen noHeader alignItems="center">
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
          <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            data-testid="register-form"
          >
            {formFields.map(field => (
              <FormInput
                key={field.id}
                id={field.id}
                type={field.type}
                isInvalid={field.invalid}
                placeholder={field.placeholder}
                label={{
                  text: field.label,
                  props: {
                    fontSize: { base: '14px', md: '16px' },
                    htmlFor: field.id
                  }
                }}
                register={field.register}
                errors={field.errors}
              />
            ))}
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
              {status === 'failure' && (
                <Text mt="8px" color="info.error" fontSize="12px">
                  erro ao criar novo usuário
                </Text>
              )}
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
        <LogoPanel side="right" />
      </Flex>
    </Screen>
  )
}
