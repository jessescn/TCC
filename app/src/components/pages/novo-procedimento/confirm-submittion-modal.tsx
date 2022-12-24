import { ConfirmDialog } from 'components/molecules/confirm-dialog'
import { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'
import { Button } from '@chakra-ui/react'

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
        variant="ghost"
        ref={cancelRef as any}
        onClick={onClose}
      >
        Cancelar
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
        Submeter
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
