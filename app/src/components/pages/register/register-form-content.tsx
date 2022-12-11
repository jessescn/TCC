import { Box, Center, Flex, Link, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import FormInput, { ErrorText } from 'components/molecules/forms/input'
import LogoPanel from 'components/organisms/logo-panel'
import { HTMLInputTypeAttribute, useEffect } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { CreateUser } from 'services/usuarios'
import { actions, selectors, store, useSelector } from 'store'
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

export const RegisterFormContent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch
  } = useForm<RegisterForm>({ mode: 'onSubmit', reValidateMode: 'onChange' })

  const status = useSelector(selectors.user.getStatusCreate)

  const handleRegisterSubmit = (form: RegisterForm) => {
    store.dispatch(actions.user.create(form))
  }

  const nameProps: fieldProps = {
    invalid: Boolean(errors.nome),
    id: 'nome',
    placeholder: 'Ex. João da Silva',
    label: 'Nome Completo',
    register: register('nome', {
      required: { value: true, message: '*campo obrigatório' }
    }),
    errors: [{ text: errors.nome?.message, condition: Boolean(errors.nome) }]
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
    invalid: Boolean(errors.senha),
    id: 'senha',
    placeholder: '******',
    type: 'password',
    label: 'Senha',
    register: register('senha', {
      required: { value: true, message: '*campo obrigatório' },
      minLength: {
        value: 8,
        message: 'A senha deve conter ao menos 8 caracteres'
      }
    }),
    errors: [{ text: errors.senha?.message, condition: Boolean(errors.senha) }]
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
        const password = getValues('senha')

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
            <>
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
              {field.id === 'senha' && (
                <PasswordStrengthBar
                  key="password-strenght"
                  style={{ marginTop: '10px' }}
                  password={watch('senha')}
                  scoreWords={[
                    'muito fraco',
                    'fraco',
                    'mediano',
                    'forte',
                    'muito forte'
                  ]}
                  shortScoreWord="senha muito curta"
                  minLength={8}
                />
              )}
            </>
          ))}
          <Center mt="32px" flexDir="column" mb="16px">
            <Button type="submit" isLoading={status.status === 'loading'}>
              Cadastrar
            </Button>
            {status.status === 'failure' && (
              <Text mt="8px" color="info.error" fontSize="12px">
                {status.message || 'erro ao criar novo usuário'}
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
  )
}
