import { ConfirmDialog } from 'components/molecules/confirm-dialog'
import { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'
import { Button } from 'components/atoms/button'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function ConfirmSubmittionModal({
  isOpen,
  onClose,
  onConfirm
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
        Cancelar
      </Button>
      <Button
        size="sm"
        ml={3}
        type="submit"
        form="novo-procedimento"
        onClick={onConfirm}
      >
        Confirmar
      </Button>
    </>
  )

  return (
    <ConfirmDialog
      title="Submeter Resposta"
      content="Tem certeza que deseja submeter sua resposta? não será possível editar enquanto não for revisado pela coordenação."
      footer={footer}
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}
