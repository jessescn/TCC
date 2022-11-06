import ConfirmDialog from 'components/molecules/confirm-dialog'
import { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'
import { Button } from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  content: string
  title?: string
  onClose: () => void
  onConfirm: () => void
  onConfirmButtonText?: string
  onCancelButtonText?: string
}

export default function ConfirmModal({
  isOpen,
  onClose,
  content,
  title,
  onConfirm,
  onConfirmButtonText,
  onCancelButtonText
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
        {onCancelButtonText || 'Cancelar'}
      </Button>
      <Button
        size="sm"
        color="initial.white"
        bgColor="primary.dark"
        _hover={{ bgColor: 'primary.default' }}
        ml={3}
        type="submit"
        form="novo-procedimento"
        onClick={onConfirm}
      >
        {onConfirmButtonText || 'Submeter'}
      </Button>
    </>
  )

  return (
    <ConfirmDialog
      title={title}
      content={content}
      footer={footer}
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}
