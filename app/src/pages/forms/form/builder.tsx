import { FormBuilder } from 'components/organisms/form-builder'
import { FormModel } from 'domain/models/form'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type Props = {
  form?: FormModel
}

export default function Builder({ form }: Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilder form={form} />
    </DndProvider>
  )
}
