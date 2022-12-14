import { Box, Text } from '@chakra-ui/react'

type Props = {
  titulo?: string
  descricao?: string
}

export default function Header({ titulo, descricao }: Props) {
  return (
    <Box
      bgColor="initial.white"
      px="24px"
      py="32px"
      borderRadius="8px"
      mb="16px"
    >
      {titulo && (
        <Text as="h1" fontSize="24px" fontWeight="bold" mb="16px">
          {titulo}
        </Text>
      )}
      {descricao && <Text as="h2">{descricao}</Text>}
    </Box>
  )
}
