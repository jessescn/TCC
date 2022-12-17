import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import ConfirmVote from 'components/molecules/votes/confirm-vote'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { useState } from 'react'
import { actions, selectors, store, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'
import BotoesVotacao from './botoes-votacao'

export type VoteOption = 'yes' | 'no'

type Props = {
  procedimento: ProcedimentoModel
}

const Votacao = ({ procedimento }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const currentStatus = getCurrentStatus(procedimento)

  const isColegiado = useSelector(selectors.session.is)('colegiado')
  const currentUser = useSelector(selectors.session.getCurrentUser)
  const statusVote = useSelector(state => state.procedimentoDetalhes.statusVote)

  const currentVote = procedimento.votos?.find(
    voto => voto.autor === currentUser?.id
  )

  const [vote, setVote] = useState(currentVote?.aprovado)

  function handleConfirmVote() {
    if (vote === undefined || !isColegiado) return

    store.dispatch(
      actions.procedimentoDetalhes.vote({
        procedimentoId: procedimento.id,
        aprovado: vote
      })
    )

    onClose()
  }

  const isSaveDisabled =
    !isColegiado ||
    vote === undefined ||
    vote === currentVote?.aprovado ||
    currentStatus !== 'em_homologacao'

  return (
    <Flex w="fit-content" marginLeft="auto">
      {/* <Box pr="16px" h="80px" overflowY="scroll">
        <VotosLista
          votos={[
            { aprovado: true, autor: 1, data: '' },
            { aprovado: false, autor: 2, data: '' },
            { aprovado: true, autor: 1, data: '' },
            { aprovado: false, autor: 2, data: '' },
            { aprovado: true, autor: 1, data: '' },
            { aprovado: false, autor: 2, data: '' },
            { aprovado: true, autor: 1, data: '' },
            { aprovado: false, autor: 2, data: '' }
          ]}
        />
      </Box> */}
      <Box>
        <BotoesVotacao
          setCurrentVote={setVote}
          votos={procedimento.votos || []}
          currentVote={vote}
        />
        <Flex mt="8px" justifyContent="space-between" alignItems="center">
          {currentVote !== undefined && (
            <Text fontSize="12px">
              Você votou em{' '}
              <Text
                color={currentVote ? 'info.success' : 'info.error'}
                as="span"
              >
                {currentVote ? 'Sim' : 'Não'}
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
            isLoading={statusVote === 'loading'}
          >
            Salvar voto
          </Button>
        </Flex>
        {currentStatus !== 'em_homologacao' && (
          <Text mt="8px" fontSize="10px" color="info.error">
            Não é mais possível votar nesse procedimento
          </Text>
        )}
        {!isColegiado && (
          <Text mt="8px" fontSize="10px" color="info.error">
            Apenas membros do colegiado podem votar
          </Text>
        )}
        <ConfirmVote
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirmVote}
          currentVote={vote ? 'Sim' : 'Não'}
        />
      </Box>
    </Flex>
  )
}

export default Votacao
