import { FocusableElement } from '@chakra-ui/utils'
import { Button } from 'components/atoms/button'
import { ConfirmDialog } from 'components/molecules/confirm-dialog'
import { useRef } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function SaveChangesModal(props: Props) {
  const cancelRef = useRef<HTMLButtonElement | FocusableElement>(null)

  const footer = (
    <>
      <Button
        size="sm"
        variant="ghost"
        ref={cancelRef as any}
        onClick={props.onClose}
      >
        Cancelar
      </Button>
      <Button size="sm" ml={3} type="submit" form="procedimento-form">
        Submeter Alterações
      </Button>
    </>
  )

  return (
    <ConfirmDialog
      cancelRef={cancelRef}
      footer={footer}
      {...props}
      title="Salvar alterações"
      content={
        'Deseja salvar as correções realizadas? Após confirmar, o procedimento será encaminhado novamente para análise.'
      }
    />
  )
}
