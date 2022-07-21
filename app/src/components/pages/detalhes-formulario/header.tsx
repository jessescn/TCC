import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { FormularioModel } from 'domain/models/formulario'

type Props = {
  formulario?: FormularioModel
}

export default function Header({ formulario }: Props) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold" fontSize="24px" color="primary.dark">
        {formulario ? 'Editar Formulário' : 'Novo Formulário'}
      </Text>
      {formulario && (
        <Text>
          Ultima edição:{' '}
          <Text as="span" fontWeight="bold" fontSize="20px">
            {format(new Date(formulario.updatedAt || ''), 'dd/MM/yyyy hh:mm')}
          </Text>
        </Text>
      )}
    </Flex>
  )
}
