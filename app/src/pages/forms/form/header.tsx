import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { FormularioModel } from 'domain/models/formulario'

type Props = {
  form?: FormularioModel
}

export default function Header({ form }: Props) {
  return (
    <Flex justifyContent="space-between">
      <Text fontWeight="bold" fontSize="28px" color="primary.dark">
        {form ? 'Editar Formulário' : 'Novo Formulário'}
      </Text>
      {form && (
        <Text fontSize="20px">
          Ultima edição:{' '}
          <Text as="span" fontWeight="bold" fontSize="24px">
            {format(new Date(form.updatedAt || ''), 'dd/MM/yyyy hh:mm')}
          </Text>
        </Text>
      )}
    </Flex>
  )
}
