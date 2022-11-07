import { ReactNode } from 'react'
import { Button, ButtonProps, useDisclosure } from '@chakra-ui/react'
import ConfirmModal from './confirm-modal'

type Props = {
  title?: string
  content: string
  style?: ButtonProps
  onConfirm: any
  onCancelButtonText?: string
  onConfirmButtonText?: string
  children: ReactNode
}

export const SimpleConfirmationButton = ({
  style,
  children,
  onConfirm,
  ...props
}: Props) => {
  const controls = useDisclosure()

  const handleConfirm = () => {
    onConfirm()
    controls.onClose()
  }

  return (
    <>
      <Button {...style} onClick={controls.onOpen}>
        {children}
      </Button>
      <ConfirmModal onConfirm={handleConfirm} {...controls} {...props} />
    </>
  )
}
