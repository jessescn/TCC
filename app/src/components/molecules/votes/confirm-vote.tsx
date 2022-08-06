import { Button } from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'

import ConfirmDialog from '../confirm-dialog'

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
      <Button size="sm" ref={cancelRef as any} onClick={onClose}>
        Cancelar
      </Button>
      <Button
        size="sm"
        color="initial.white"
        bgColor="primary.dark"
        _hover={{ bgColor: 'primary.default' }}
        ml={3}
        onClick={onConfirm}
      >
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
