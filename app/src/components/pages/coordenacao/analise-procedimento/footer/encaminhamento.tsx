import { Flex } from '@chakra-ui/react'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { actions, store, useSelector } from 'store'

export default function FooterEncaminhamento() {
  const statusEncaminhamento = useSelector(
    state => state.procedimentoDetalhes.statusEncaminhamento
  )
  const statusFetch = useSelector(
    state => state.procedimentoDetalhes.statusFetch
  )
  const isLoading =
    statusEncaminhamento === 'loading' || statusFetch === 'loading'

  const handleConfirm = () => {
    store.dispatch(actions.procedimentoDetalhes.forwardToSecretaria())
  }

  return (
    <Flex justifyContent="flex-end" mt="1rem">
      <SimpleConfirmationButton
        style={{
          fontSize: 'sm',
          size: 'sm',
          bgColor: 'primary.dark',
          color: 'initial.white',
          _hover: { bgColor: 'primary.default' },
          isLoading: isLoading
        }}
        title="Encaminhar Procedimento"
        onConfirm={handleConfirm}
        onConfirmButtonText="Enviar"
        content="Tem certeza que deseja encaminhar esse procedimento a secretaria?"
      >
        Encaminhar para secretaria
      </SimpleConfirmationButton>
    </Flex>
  )
}
