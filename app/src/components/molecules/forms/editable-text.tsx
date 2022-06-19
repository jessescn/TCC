import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Input,
  InputProps,
  StyleProps,
  useEditableControls
} from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'

type Props = {
  register?: UseFormRegisterReturn
  children: JSX.Element
  defaultValue?: string
  inputProps?: InputProps
  styleProps?: StyleProps
}

const EditableText = ({
  register,
  children,
  defaultValue,
  inputProps,
  styleProps
}: Props) => {
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" ml="16px">
        <IconButton
          aria-label="cancelar edição nome"
          icon={<Icon as={AiOutlineClose} />}
          {...getCancelButtonProps()}
        />
        <IconButton
          aria-label="confirmar edição nome"
          icon={<Icon as={AiOutlineCheck} />}
          {...getSubmitButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="editar nome"
          size="sm"
          icon={<Icon as={AiOutlineEdit} />}
          {...getEditButtonProps()}
        />
      </Flex>
    )
  }

  return (
    <Editable
      display="flex"
      alignItems="flex-end"
      defaultValue={defaultValue}
      maxW="800px"
      w="100%"
      mb={8}
      isPreviewFocusable={false}
      {...styleProps}
    >
      {children}
      <EditablePreview fontWeight="bold" lineHeight="normal" mr="16px" />
      <Input as={EditableInput} w="100%" h={8} {...register} {...inputProps} />
      <EditableControls />
    </Editable>
  )
}

export default EditableText
