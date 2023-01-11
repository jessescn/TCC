import { Box, Center, Stack, Text } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'
import { CustomLink } from 'components/atoms/custom-link'
import { SimpleErrorMessage } from 'components/atoms/simple-error-message'
import FormInput, { ErrorText } from 'components/molecules/forms/input'

import { HTMLInputTypeAttribute } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import PasswordStrengthBar from 'react-password-strength-bar'
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
  confirmaSenha: string
}

export default function RegisterFormContent() {
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
    id: 'nome',
    label: 'Nome Completo',
    placeholder: 'Ex. João da Silva',
    invalid: Boolean(errors.nome),
    register: register('nome', {
      required: { value: true, message: '*campo obrigatório' }
    }),
    errors: [{ text: errors.nome?.message, condition: Boolean(errors.nome) }]
  }

  const emailProps: fieldProps = {
    id: 'email',
    label: 'Email',
    placeholder: 'Ex. email@ccc.ufcg.edu.br',
    invalid: Boolean(errors.email),
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
    id: 'senha',
    label: 'Senha',
    placeholder: '********',
    type: 'password',
    invalid: Boolean(errors.senha),
    register: register('senha', {
      required: { value: true, message: '*campo obrigatório' },
      minLength: {
        value: 8,
        message: 'A senha deve conter ao menos 8 caracteres'
      }
    }),
    errors: [{ text: errors.senha?.message, condition: Boolean(errors.senha) }]
  }

  const confirmaSenhaProps: fieldProps = {
    id: 'confirmaSenha',
    label: 'Confirmar Senha',
    type: 'password',
    placeholder: '******',
    invalid: Boolean(errors.confirmaSenha),
    register: register('confirmaSenha', {
      required: { value: true, message: '*campo obrigatório' },
      validate: (value: string) => {
        const password = getValues('senha')

        return value === password
      }
    }),
    errors: [
      {
        text: errors.confirmaSenha?.message,
        condition: Boolean(errors.confirmaSenha)
      },
      {
        text: 'as senhas não correspondem',
        condition: Boolean(
          errors.confirmaSenha && errors.confirmaSenha.type === 'validate'
        )
      }
    ]
  }

  const formFields = [nameProps, emailProps, passwordProps, confirmaSenhaProps]

  return (
    <Box w={{ base: '100%', md: '470px' }} p={{ base: '0.5rem', md: '1.5rem' }}>
      <Text fontWeight="bold" fontSize={{ base: 'md', md: 'xl' }}>
        Cadastro
      </Text>
      <form
        onSubmit={handleSubmit(handleRegisterSubmit)}
        data-testid="register-form"
      >
        <Stack my="1rem" spacing="0.5rem">
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
                    fontSize: { base: 'sm', md: 'md' },
                    htmlFor: field.id
                  }
                }}
                register={field.register}
                errors={field.errors}
              />
              {field.id === 'senha' && (
                <PasswordStrengthBar
                  key="password-strenght"
                  style={{ marginTop: '0.5rem' }}
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
        </Stack>
        <Center flexDir="column">
          <Button type="submit" isLoading={status.status === 'loading'}>
            Cadastrar
          </Button>
          {status.status === 'failure' && (
            <SimpleErrorMessage
              message={status.message || 'erro ao criar novo usuário'}
            />
          )}
          <Box mt="0.5rem">
            <CustomLink redirectTo="/login">já possuo conta!</CustomLink>
          </Box>
        </Center>
      </form>
    </Box>
  )
}
