import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'

type Props = {
  tipo?: TipoProcedimentoModel
}

export default function Header({ tipo }: Props) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text fontWeight="bold" fontSize="24px" color="primary.dark">
        {tipo ? 'Editar Tipo Procedimento' : 'Novo Tipo Procedimento'}
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
