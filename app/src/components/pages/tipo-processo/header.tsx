import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { TipoProcessoModel } from 'domain/models/tipo-processo'

type Props = {
  tipo?: TipoProcessoModel
}

export default function Header({ tipo }: Props) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold" fontSize="24px" color="primary.dark">
        {tipo ? 'Editar Tipo Processo' : 'Novo Tipo Processo'}
      </Text>
      {tipo && (
        <Text>
          Ultima edição:{' '}
          <Text as="span" fontWeight="bold" fontSize="20px">
            {format(new Date(tipo.updatedAt || ''), 'dd/MM/yyyy hh:mm')}
          </Text>
        </Text>
      )}
    </Flex>
  )
}
