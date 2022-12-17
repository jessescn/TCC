import { Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { VotoProcedimento } from 'domain/models/procedimento'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { selectors, useSelector } from 'store'

type Props = {
  currentVote?: boolean
  setCurrentVote: (vote: boolean) => void
  votos: VotoProcedimento[]
}

const BotoesVotacao = ({ votos, currentVote, setCurrentVote }: Props) => {
  const statusVote = useSelector(state => state.procedimentoDetalhes.statusVote)
  const isColegiado = useSelector(selectors.session.is)('colegiado')

  const isPositiveVote = currentVote !== undefined && currentVote
  const isNegativeVote = currentVote !== undefined && !currentVote

  const positiveCount = votos.filter(voto => voto.aprovado).length
  const negativeCount = votos.filter(voto => !voto.aprovado).length

  return (
    <Flex alignItems="center" justifyContent="space-between">
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
          onClick={() => setCurrentVote(true)}
          bgColor={isPositiveVote ? 'info.success' : 'transparent'}
          _focus={{ boxShadow: 'none' }}
          height="fit-content"
          px="12px"
          py="6px"
          borderWidth="2px"
          borderRadius="0"
          borderColor="#000"
          aria-label="vote no"
          isDisabled={statusVote === 'loading' || !isColegiado}
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
          onClick={() => setCurrentVote(false)}
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
          isDisabled={statusVote === 'loading' || !isColegiado}
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

export default BotoesVotacao
