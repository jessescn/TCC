import ConfirmDialog from 'components/molecules/confirm-dialog'
import { FocusableElement } from '@chakra-ui/utils'
import { useRef } from 'react'
import { Button } from '@chakra-ui/react'

type Props = {
  onConfirm: () => void
  isOpen: boolean
  onClose: () => void
  isColegiado: boolean
}

export default function ConfirmApproveModal({
  isOpen,
  onClose,
  onConfirm,
  isColegiado
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
        onClick={onConfirm}
      >
        Confirmar
      </Button>
    </>
  )

  const content = isColegiado
    ? `Deseja mesmo aprovar o procedimento? Caso aprovado, será encaminhando para aprovação pelo colegiado.`
    : 'Deseja mesmo aprovar o procedimento?'

  return (
    <ConfirmDialog
      title="Confirmar voto"
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      footer={footer}
      content={content}
    />
  )
}
