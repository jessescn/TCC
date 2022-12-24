import {
  AlertDialog,
  AlertDialogBody as AlertBody,
  AlertDialogContent as AlertContent,
  AlertDialogFooter as AlertFooter,
  AlertDialogHeader as AlertHeader,
  AlertDialogOverlay as AlertOverlay
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { ReactNode, RefObject } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  cancelRef: RefObject<FocusableElement>
  title?: string
  content: string
  footer?: ReactNode
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  cancelRef,
  title,
  content,
  footer
}: Props) => {
  return (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      leastDestructiveRef={cancelRef}
    >
      <AlertOverlay>
        <AlertContent>
          {title && <AlertHeader>{title}</AlertHeader>}
          <AlertBody fontSize="14px">{content}</AlertBody>
          {footer && <AlertFooter>{footer}</AlertFooter>}
        </AlertContent>
      </AlertOverlay>
    </AlertDialog>
  )
}
