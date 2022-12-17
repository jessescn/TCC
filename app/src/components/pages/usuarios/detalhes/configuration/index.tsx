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
    <Stack spacing="24px" my="24px">
      <Stack direction="row" w="100%">
        <Box alignItems="center" w="50%">
          <Text fontSize="14px" mb="8px" fontWeight="bold">
            Nome
          </Text>
          <Input
            isInvalid={errors['nome']}
            defaultValue={usuario?.nome}
            size="sm"
            {...register('nome', {
              required: { value: true, message: 'Nome obrigatório' }
            })}
          />
          <ErrorMessage errors={errors} fieldName="nome" />
        </Box>
        <Box alignItems="center" w="50%">
          <Text fontSize="14px" mb="8px" fontWeight="bold">
            Email
          </Text>
          <Input
            defaultValue={usuario?.email}
            size="sm"
            disabled
            _disabled={{ bgColor: 'secondary.light', color: 'secondary.dark' }}
          />
        </Box>
      </Stack>
      <Stack spacing="30px" direction="row">
        <Box alignItems="center">
          <ProfileSelect />
        </Box>
      </Stack>
      <Box alignItems="center" w="100%">
        <PublicosSelect />
      </Box>
    </Stack>
  )
}
