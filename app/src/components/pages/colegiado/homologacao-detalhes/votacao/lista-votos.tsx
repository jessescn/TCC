import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { VotoProcedimento } from 'domain/models/procedimento'
import { UserModel } from 'domain/models/user'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

type Props = {
  votos: VotoProcedimento[]
  currentUser: UserModel | null
}

const VotosLista = ({ votos, currentUser }: Props) => {
  const currentVote = votos.find(voto => voto.autor.id === currentUser?.id)

  const filteredVotes = votos.filter(voto => voto.autor.id !== currentUser?.id)

  const getVoto = (voto: VotoProcedimento) => {
    const color = voto.aprovado ? 'info.success' : 'info.error'
    const icon = voto.aprovado ? AiOutlineCheck : AiOutlineClose
    const isCurrentUser = voto.autor.id === currentUser?.id

    return (
      <Flex alignItems="center">
        <Icon as={icon} color={color} />
        <Text
          key={voto.autor.id}
          fontWeight={isCurrentUser ? 'bold' : 'normal'}
        >
          {voto.autor.nome}
        </Text>
      </Flex>
    )
  }

  return (
    <Box>
      <Text fontSize="14px" fontWeight="bold" mb="8px">
        Quem já votou
      </Text>
      <Stack
        pr="8px"
        spacing="4px"
        fontSize="12px"
        maxH="100px"
        maxW="200px"
        overflowY="auto"
      >
        {currentVote && getVoto(currentVote)}
        {filteredVotes.map(voto => getVoto(voto))}
      </Stack>
    </Box>
  )
}

export default VotosLista
