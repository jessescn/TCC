import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { ComentarioModel } from 'domain/models/comentario'
import { selectors, useSelector } from 'store'

import { formatDate } from 'utils/format'

type Props = {
  comentario: ComentarioModel
}

const Comentario = ({ comentario }: Props) => {
  const currentUser = useSelector(selectors.session.getCurrentUser)

  const isFromCurrentUser = currentUser?.email === comentario.actor?.email
  const nome = isFromCurrentUser ? 'Eu' : comentario?.actor?.nome || 'Anônimo'

  return (
    <Flex w="100%">
      <Avatar size="sm" mr="12px" />
      <Box w="100%">
        <Flex alignItems="center" justifyContent="space-between">
          <Flex>
            <Text fontSize="10px" fontWeight="bold" mr="8px">
              {nome}
            </Text>
            <Box
              as="span"
              ml="2px"
              borderRadius="4px"
              bgColor="info.warning"
              color="initial.black"
            >
              <Text fontSize="10px" px="2px">
                {comentario.actor?.profile?.nome}
              </Text>
            </Box>
          </Flex>
          <Text fontSize="10px">{formatDate(comentario.createdAt)}</Text>
        </Flex>
        <Text fontSize="10px" color="secondary.dark">
          {comentario?.actor?.email}
        </Text>
        <Text
          fontSize="12px"
          my="8px"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word'
          }}
        >
          {comentario.conteudo}
        </Text>
      </Box>
    </Flex>
  )
}

export default Comentario
