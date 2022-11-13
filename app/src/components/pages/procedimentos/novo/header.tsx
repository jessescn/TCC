import { Box, Text } from '@chakra-ui/react'
import { TipoProcedimentoModel } from 'domain/models/tipo-procedimento'

type Props = {
  tipoProcedimento: TipoProcedimentoModel
}

export default function Header({ tipoProcedimento }: Props) {
  return (
    <Box
      bgColor="initial.white"
      px="24px"
      py="32px"
      borderRadius="8px"
      mb="16px"
    >
      <Text as="h1" fontSize="24px" fontWeight="bold" mb="16px">
        {tipoProcedimento.nome}
      </Text>
      <Text as="h2">{tipoProcedimento.descricao}</Text>
    </Box>
  )
}
