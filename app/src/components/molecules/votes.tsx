import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { ProcessoModel } from 'domain/models/processo'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { actions, selectors, store, useSelector } from 'store'

export type VoteOption = 'yes' | 'no'

type Props = {
  processo: ProcessoModel
}

const Votes = ({ processo }: Props) => {
  const currentUser = useSelector(selectors.session.getCurrentUser)

  const currentVote = processo.votos?.find(
    voto => voto.autor === currentUser?.id
  )

  function handleVote(vote: boolean) {
    store.dispatch(
      actions.processo.vote({ processoId: processo.id, aprovado: vote })
    )
  }

  const isPositiveVote = currentVote
  const isNegativeVote = currentVote !== undefined && !currentVote

  const positiveCount = (processo.votos || []).filter(
    voto => voto.aprovado
  ).length
  const negativeCount = (processo.votos || []).filter(
    voto => !voto.aprovado
  ).length

  return (
    <Flex alignItems="center">
      <Flex alignItems="flex-end">
        <Text fontSize="12px" mr="8px">
          Votos:
        </Text>
        <Flex alignItems="center" mr="8px">
          <Text fontWeight="bold" mr="4px">
            {positiveCount}
          </Text>
          <Icon as={AiOutlineCheck} color="info.success" />
        </Flex>
        <Flex alignItems={'center'}>
          <Text fontWeight="bold" mr="4px">
            {negativeCount}
          </Text>
          <Icon as={AiOutlineClose} color="info.error" />
        </Flex>
      </Flex>
      <Flex ml="16px">
        <IconButton
          onClick={() => handleVote(true)}
          bgColor={isPositiveVote ? 'info.success' : 'transparent'}
          _focus={{ boxShadow: 'none' }}
          height="fit-content"
          px="12px"
          py="6px"
          borderWidth="2px"
          borderRadius="0"
          borderColor="#000"
          aria-label="vote no"
          _hover={{ bgColor: 'info.success' }}
          icon={
            <Icon
              _hover={{ color: 'initial.white' }}
              as={AiOutlineCheck}
              color={isPositiveVote ? 'initial.white' : 'secondary.dark'}
            />
          }
        />
        <IconButton
          onClick={() => handleVote(false)}
          bgColor={isNegativeVote ? 'info.error' : 'transparent'}
          _focus={{ boxShadow: 'none' }}
          height="fit-content"
          px="12px"
          py="6px"
          borderWidth="2px"
          borderRadius="0"
          borderColor="#000"
          _hover={{ bgColor: 'info.error' }}
          aria-label="vote yes"
          icon={
            <Icon
              _hover={{ color: 'initial.white' }}
              as={AiOutlineClose}
              color={isNegativeVote ? 'initial.white' : 'secondary.dark'}
            />
          }
        />
      </Flex>
    </Flex>
  )
}

export default Votes
