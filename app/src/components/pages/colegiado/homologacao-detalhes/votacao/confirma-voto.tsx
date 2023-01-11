import { FocusableElement } from '@chakra-ui/utils'
import { Button } from 'components/atoms/button'
import { ConfirmDialog } from 'components/molecules/confirm-dialog'
import { useRef } from 'react'

type Props = {
  onConfirm: () => void
  currentVote: string
  isOpen: boolean
  onClose: () => void
}

export default function ConfirmVote({
  currentVote,
  onConfirm,
  onClose,
  isOpen
}: Props) {
  const cancelRef = useRef<HTMLButtonElement | FocusableElement>(null)

  const footer = (
    <>
      <Button
        size="sm"
        variant="ghost"
        ref={cancelRef as any}
        onClick={onClose}
      >
        Cancelar
      </Button>
      <Button size="sm" color="initial.white" ml={3} onClick={onConfirm}>
        Confirmar
      </Button>
    </>
  )

  return (
    <ConfirmDialog
      title="Confirmar voto"
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      footer={footer}
      content={`Deseja mesmo confirmar seu voto como ${currentVote}?`}
    />
  )
}
