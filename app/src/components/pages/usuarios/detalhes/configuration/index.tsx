import { Box, Input, Stack, Text } from '@chakra-ui/react'
import { ErrorMessage } from 'components/molecules/forms/error-message'
import { UserModel } from 'domain/models/user'
import { useFormContext } from 'react-hook-form'
import ProfileSelect from './profile-select'
import PublicosSelect from './publicos-select'

export type Props = {
  usuario?: UserModel
}

export default function UsuarioConfiguration({ usuario }: Props) {
  const {
    formState: { errors },
    register
  } = useFormContext()

  return (
    <Stack spacing="1.5rem" my="1.5rem">
      <Stack direction="row" spacing="1.5rem">
        <Box alignItems="center" w="50%">
          <Text fontSize="sm" mb="0.5rem" fontWeight="bold">
            Nome
          </Text>
          <Input
            size="sm"
            isInvalid={errors['nome']}
            defaultValue={usuario?.nome}
            {...register('nome', {
              required: { value: true, message: 'Nome obrigatório' }
            })}
          />
          <ErrorMessage errors={errors} fieldName="nome" />
        </Box>
        <Box alignItems="center" w="50%">
          <Text fontSize="sm" mb="0.5rem" fontWeight="bold">
            Email
          </Text>
          <Input
            size="sm"
            defaultValue={usuario?.email}
            disabled
            _disabled={{ bgColor: 'secondary.light', color: 'secondary.dark' }}
          />
        </Box>
      </Stack>
      <ProfileSelect />
      <PublicosSelect />
    </Stack>
  )
}
