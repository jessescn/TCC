import { ConfirmDialog } from 'components/molecules/confirm-dialog'
import { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'
import { StyleProps } from '@chakra-ui/react'
import { Button } from 'components/atoms/button'

type Props = {
  isOpen: boolean
  content: string
  title?: string
  onClose: () => void
  onConfirm: () => void
  onConfirmButtonText?: string
  onConfirmButtonStyle?: StyleProps
  onCancelButtonText?: string
}

export default function ConfirmModal({
  isOpen,
  onClose,
  content,
  title,
  onConfirm,
  onConfirmButtonText,
  onCancelButtonText,
  onConfirmButtonStyle
}: Props) {
  const cancelRef = useRef<HTMLButtonElement | FocusableElement>(null)

  const footer = (
    <>
      <Button
        size="sm"
        customVariant="ghost"
        ref={cancelRef as any}
        onClick={onClose}
      >
        {onCancelButtonText || 'Cancelar'}
      </Button>
      <Button
        size="sm"
        ml={3}
        type="submit"
        form="novo-procedimento"
        onClick={onConfirm}
        {...onConfirmButtonStyle}
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
