import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { ComentarioModel } from 'domain/models/comentario'

import { formatDate } from 'utils/format'

type Props = {
  comentario: ComentarioModel
}

const Comment = ({ comentario }: Props) => {
  return (
    <Flex w="100%">
      <Avatar size="xs" mr="12px" />
      <Box w="100%">
        <Flex alignItems="center">
          <Text fontSize="10px" fontWeight="bold" mr="8px">
            {comentario?.user.nome || 'Anônimo'}
          </Text>
          <Text fontSize="10px" color="secondary.dark">
            {comentario?.user.email}
          </Text>
        </Flex>
        <Text
          fontSize="10px"
          my="8px"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          }}
        >
          {comentario.conteudo}
        </Text>
        <Flex justifyContent="flex-end">
          <Text fontSize="10px" color="secondary.dark">
            {formatDate(comentario.createdAt)}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Comment
