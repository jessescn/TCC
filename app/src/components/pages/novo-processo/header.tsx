import { Box, Text } from '@chakra-ui/react'
import { TipoProcessoModel } from 'domain/models/tipo-processo'

type Props = {
  tipoProcesso: TipoProcessoModel
}

export default function Header({ tipoProcesso }: Props) {
  return (
    <Box
      bgColor="initial.white"
      px="24px"
      py="32px"
      borderRadius="8px"
      mb="16px"
    >
      <Text as="h1" fontSize="24px" fontWeight="bold" mb="16px">
        {tipoProcesso.nome}
      </Text>
      <Text as="h2">{tipoProcesso.descricao}</Text>
    </Box>
  )
}
