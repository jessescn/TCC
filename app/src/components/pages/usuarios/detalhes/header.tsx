import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { UserModel } from 'domain/models/user'

type Props = {
  usuario?: UserModel
}

export default function Header({ usuario }: Props) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold" fontSize="24px" color="primary.dark">
        Editar Usuário{' '}
        <Text as="span" fontSize="14px" color="secondary.dark">
          ID: {usuario?.id}
        </Text>
      </Text>
      {usuario && (
        <Text>
          Ultima edição:{' '}
          <Text as="span" fontWeight="bold" fontSize="20px">
            {format(new Date(usuario.updatedAt || ''), 'dd/MM/yyyy hh:mm')}
          </Text>
        </Text>
      )}
    </Flex>
  )
}
