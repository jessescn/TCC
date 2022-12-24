import {
  AlertDialog,
  AlertDialogBody as AlertBody,
  AlertDialogContent as AlertContent,
  AlertDialogFooter as AlertFooter,
  AlertDialogHeader as AlertHeader,
  AlertDialogOverlay as AlertOverlay,
  Button,
  Text
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { SelectOption, MultipleSelect } from 'components/atoms/multiple-select'
import { SimpleConfirmationButton } from 'components/organisms/simple-confirmation-button'
import { FormularioModel } from 'domain/models/formulario'
import { ReactNode, RefObject, useState } from 'react'
import { selectors, useSelector } from 'store'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (form: FormularioModel) => void
  cancelRef: RefObject<FocusableElement>
  footer?: ReactNode
}

export default function DuplicateFormularioModal({
  isOpen,
  onClose,
  cancelRef,
  onConfirm
}: Props) {
  const [selectedFormOptions, setSelectedFormOptions] = useState<
    SelectOption | undefined
  >()
  const formularios = useSelector(selectors.formularioDetalhes.getFormularios)

  const formOptions = formularios.map(formulario => ({
    value: formulario,
    label: `${formulario.nome} (id:${formulario.id})`
  }))

  const handleConfirm = () => {
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
      <SimpleConfirmationButton
        style={{
          size: 'sm',
          color: 'initial.white',
          bgColor: 'primary.dark',
          _hover: { bgColor: 'primary.default' },
          ml: 3,
          type: 'submit',
          form: 'novo-procedimento',
          disabled: !selectedFormOptions
        }}
        onConfirm={handleConfirm}
        title="Confirmar Acão"
        content="Todos os dados do formulário serão sobrescritos. Deseja continuar?"
        onConfirmButtonText="Sim"
        onCancelButtonText="Não"
      >
        Importar Dados
      </SimpleConfirmationButton>
    </>
  )

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
          <AlertHeader>Duplicar Formulário</AlertHeader>
          <AlertBody fontSize="sm">
            <Text mb="0.5rem">Selecione um formulário que deseja duplicar</Text>
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
  )
}
