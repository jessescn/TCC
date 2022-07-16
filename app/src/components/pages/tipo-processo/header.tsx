import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { TipoProcessoModel } from 'domain/models/tipo-processo'

type Props = {
  tipo?: TipoProcessoModel
}

export default function Header({ tipo }: Props) {
  return (
    <Flex justifyContent="space-between">
      <Text fontWeight="bold" fontSize="28px" color="primary.dark">
        {tipo ? 'Editar Formulário' : 'Novo Formulário'}
      </Text>
      {tipo && (
        <Text fontSize="20px">
          Ultima edição:{' '}
          <Text as="span" fontWeight="bold" fontSize="24px">
            {format(new Date(tipo.updatedAt || ''), 'dd/MM/yyyy hh:mm')}
          </Text>
        </Text>
      )}
    </Flex>
  )
}
