import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { useState } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { actions, selectors, store, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'
import ConfirmVote from '../../molecules/votes/confirm-vote'

export type VoteOption = 'yes' | 'no'

type Props = {
  procedimento: ProcedimentoModel
}

const Votes = ({ procedimento }: Props) => {
  const isColegiado = false

  const currentStatus = getCurrentStatus(procedimento)

  const currentUser = useSelector(selectors.session.getCurrentUser)
  const statusVote = useSelector(state => state.procedimento.statusVote)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const currentVote = procedimento.votos?.find(
    voto => voto.autor === currentUser?.id
  )

  const [vote, setVote] = useState(currentVote?.aprovado)

  function handleConfirmVote() {
    if (!vote || !isColegiado) return

    store.dispatch(
      actions.procedimento.vote({
        procedimentoId: procedimento.id,
        aprovado: vote
      })
    )

    onClose()
  }

  const isPositiveVote = vote !== undefined && vote
  const isNegativeVote = vote !== undefined && !vote

  const positiveCount = (procedimento.votos || []).filter(
    voto => voto.aprovado
  ).length
  const negativeCount = (procedimento.votos || []).filter(
    voto => !voto.aprovado
  ).length

  const isSaveDisabled =
    !isColegiado ||
    vote === undefined ||
    vote === currentVote?.aprovado ||
    currentStatus !== 'em_homologacao'

  return (
    <Box w="fit-content" marginLeft="auto">
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
            onClick={() => setVote(true)}
            bgColor={isPositiveVote ? 'info.success' : 'transparent'}
            _focus={{ boxShadow: 'none' }}
            height="fit-content"
            px="12px"
            py="6px"
            borderWidth="2px"
            borderRadius="0"
            borderColor="#000"
            aria-label="vote no"
            isDisabled={statusVote === 'loading'}
            isLoading={isPositiveVote && statusVote === 'loading'}
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
            onClick={() => setVote(false)}
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
            isDisabled={statusVote === 'loading'}
            isLoading={isPositiveVote && statusVote === 'loading'}
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
      <Flex mt="8px" justifyContent="space-between" alignItems="center">
        {vote !== undefined && isColegiado && (
          <Text fontSize="12px">
            Você votou em{' '}
            <Text color={vote ? 'info.success' : 'info.error'} as="span">
              {vote ? 'Sim' : 'Não'}
            </Text>
          </Text>
        )}
        <Button
          marginLeft="auto"
          bgColor="primary.dark"
          color="initial.white"
          _hover={{ bgColor: 'primary.default' }}
          size="xs"
          onClick={onOpen}
          disabled={isSaveDisabled}
        >
          Salvar voto
        </Button>
      </Flex>
      {currentStatus !== 'em_homologacao' && (
        <Text mt="8px" fontSize="10px" color="info.error">
          Não é mais possível votar nesse procedimento
        </Text>
      )}
      <ConfirmVote
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmVote}
        currentVote={vote ? 'Sim' : 'Não'}
      />
    </Box>
  )
}

export default Votes
