import {
  Editable,
  EditableInput,
  EditablePreview,
  StyleProps
} from '@chakra-ui/react'

type EdditableTextProps = StyleProps

export const EditableText = ({ ...styleProps }: EdditableTextProps) => {
  return (
    <Editable defaultValue="Clique para editar" {...styleProps}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
