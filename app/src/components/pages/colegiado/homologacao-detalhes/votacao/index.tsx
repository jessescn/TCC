import { Box, Flex, Text } from '@chakra-ui/react'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { ProcedimentoModel } from 'domain/models/procedimento'
import { useEffect, useState } from 'react'
import { actions, selectors, store, useSelector } from 'store'
import { getCurrentStatus } from 'utils/procedimento'
import BotoesVotacao from './botoes-votacao'
import ListaVotos from './lista-votos'

export type VoteOption = 'yes' | 'no'

type Props = {
  procedimento: ProcedimentoModel
}

const Votacao = ({ procedimento }: Props) => {
  const currentStatus = getCurrentStatus(procedimento)

  const isColegiado = useSelector(selectors.session.is)('colegiado')
  const currentUser = useSelector(selectors.session.getCurrentUser)
  const statusVote = useSelector(state => state.procedimentoDetalhes.statusVote)

  const currentVote = procedimento.votos?.find(
    voto => voto.autor.id === currentUser?.id
  )

  const [vote, setVote] = useState(currentVote?.aprovado)

  useEffect(() => {
    if (currentVote?.aprovado !== vote) {
      setVote(currentVote?.aprovado)
    }
  }, [currentVote])

  function handleConfirmVote() {
    if (vote === undefined || !isColegiado) return

    store.dispatch(
      actions.procedimentoDetalhes.vote({
        procedimentoId: procedimento.id,
        aprovado: vote
      })
    )
  }

  function handleDeleteVote() {
    if (vote === undefined || !isColegiado) return

    store.dispatch(actions.procedimentoDetalhes.cancelVote(procedimento.id))
  }

  const isVoteDisabled = !isColegiado || currentStatus !== 'em_homologacao'

  const isSaveVoteDisabled =
    isVoteDisabled || vote === undefined || vote === currentVote?.aprovado

  const isCancelVoteDisabled = isVoteDisabled || currentVote === undefined

  return (
    <Flex w="fit-content" marginLeft="auto">
      <Box mr="32px">
        <ListaVotos
          votos={procedimento?.votos || []}
          currentUser={currentUser}
        />
      </Box>
      <Box>
        <BotoesVotacao
          setCurrentVote={setVote}
          votos={procedimento.votos || []}
          currentVote={vote}
        />
        <Flex mt="8px" justifyContent="space-between" alignItems="center">
          {!isCancelVoteDisabled && (
            <SimpleConfirmationButton
              title="Cancelar Voto"
              content={`Deseja mesmo cancelar seu voto? você poderá votar novamente enquanto os votos não alcançarem a maioria`}
              onConfirmButtonText="Cancelar Voto"
              onCancelButtonText="Voltar"
              onConfirm={handleDeleteVote}
              style={{
                marginLeft: 'auto',
                bgColor: 'info.error',
                color: 'initial.white',
                _hover: { bgColor: 'info.errorDark' },
                size: 'xs',
                disabled: isCancelVoteDisabled,
                isLoading: statusVote === 'loading'
              }}
            >
              Cancelar Voto
            </SimpleConfirmationButton>
          )}
          <SimpleConfirmationButton
            title="Confirmar Voto"
            content={`Deseja mesmo confirmar seu voto como ${
              vote ? 'Sim' : 'Não'
            }?`}
            onConfirm={handleConfirmVote}
            style={{
              marginLeft: 'auto',
              bgColor: 'primary.dark',
              color: 'initial.white',
              _hover: { bgColor: 'primary.default' },
              size: 'xs',
              disabled: isSaveVoteDisabled,
              isLoading: statusVote === 'loading'
            }}
          >
            Salvar Voto
          </SimpleConfirmationButton>
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
      </Box>
    </Flex>
  )
}

export default Votacao
