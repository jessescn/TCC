import {
  AlertDialog,
  AlertDialogBody as AlertBody,
  AlertDialogContent as AlertContent,
  AlertDialogFooter as AlertFooter,
  AlertDialogHeader as AlertHeader,
  AlertDialogOverlay as AlertOverlay,
  Button,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import MultipleSelect from 'components/atoms/multiple-select'
import ConfirmModal from 'components/organisms/confirm-modal'
import { FormularioModel } from 'domain/models/formulario'
import { ReactNode, RefObject, useState } from 'react'
import { selectors, useSelector } from 'store'

type Option = {
  value: any
  label: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (form: FormularioModel) => void
  cancelRef: RefObject<FocusableElement>
  footer?: ReactNode
}

export const DuplicateFormModal = ({
  isOpen,
  onClose,
  cancelRef,
  onConfirm
}: Props) => {
  const [selectedFormOptions, setSelectedFormOptions] = useState<
    Option | undefined
  >()
  const confirmModalControls = useDisclosure()
  const formularios = useSelector(selectors.formulario.getFormularios)

  const formOptions = formularios.map(formulario => ({
    value: formulario,
    label: `${formulario.nome} (id:${formulario.id})`
  }))

  const handleConfirm = () => {
    confirmModalControls.onClose()
    const formulario = selectedFormOptions?.value

    if (formulario) {
      onConfirm(formulario)
    }
  }

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
        onClick={confirmModalControls.onOpen}
        disabled={!selectedFormOptions}
      >
        Importar Dados
      </Button>
    </>
  )

  return (
    <>
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
            `<AlertHeader>Duplicar Formulário</AlertHeader>
            <AlertBody fontSize="14px">
              <Text mb="10px">Selecione um formulário que deseja duplicar</Text>
              <MultipleSelect
                options={formOptions}
                value={selectedFormOptions}
                onChange={value => setSelectedFormOptions(value as any)}
              />
            </AlertBody>
            <AlertFooter>{footer}</AlertFooter>
          </AlertContent>
        </AlertOverlay>
      </AlertDialog>
      <ConfirmModal
        {...confirmModalControls}
        onConfirm={handleConfirm}
        title="Confirmar Acão"
        content="Todos os dados do formulário serão sobrescritos. Deseja continuar?"
        onConfirmButtonText="Sim"
        onCancelButtonText="Não"
      />
    </>
  )
}
