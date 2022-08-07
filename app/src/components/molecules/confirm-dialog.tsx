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

export default function ConfirmDialog({
  isOpen,
  onClose,
  cancelRef,
  title,
  content,
  footer
}: Props) {
  return (
    <AlertDialog
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
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
