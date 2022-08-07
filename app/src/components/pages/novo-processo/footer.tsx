import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions, store, useSelector } from 'store'
import ConfirmSubmittionModal from './modals/confirm-submittion'

type Props = {
  currentIdx: number
  isLastForm: boolean
  onClear: () => void
  onChangeForm: (idx: number) => void
}

export default function Footer({
  onChangeForm,
  currentIdx,
  isLastForm
}: Props) {
  const navigate = useNavigate()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const submitStatus = useSelector(state => state.processo.statusSubmit)

  const SubmitButton = (
    <Button
      bgColor="primary.dark"
      color="initial.white"
      display="block"
      size="sm"
      onClick={onOpen}
    >
      Submeter Processo
    </Button>
  )

  const NextButton = (
    <Button
      as={Box}
      bgColor="primary.dark"
      color="initial.white"
      cursor="pointer"
      size="sm"
      onClick={() => onChangeForm(currentIdx + 1)}
    >
      Próximo Formulário
    </Button>
  )

  const handleConfirm = () => {
    onClose()
  }

  useEffect(() => {
    if (submitStatus === 'success') {
      navigate('/meus-processos')
      store.dispatch(actions.processo.resetStatus())
    }
  }, [submitStatus])

  return (
    <Flex justifyContent="flex-end" mt="16px">
      <Flex justifyContent="flex-end">
        {currentIdx > 0 && (
          <Button
            bgColor="initial.white"
            borderColor="primary.dark"
            borderWidth={1}
            color="primary.dark"
            size="sm"
            mr="8px"
            isLoading={submitStatus === 'loading'}
            onClick={() => onChangeForm(currentIdx - 1)}
          >
            Voltar
          </Button>
        )}
        {isLastForm ? SubmitButton : NextButton}
      </Flex>
      <ConfirmSubmittionModal
        onConfirm={handleConfirm}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  )
}
