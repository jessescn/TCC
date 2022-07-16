import { TipoProcessoModel } from 'domain/models/tipo-processo'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

type Props = {
  tipo?: TipoProcessoModel
}

export default function Builder({ tipo }: Props) {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <FormBuilder tipo={tipo} /> */}
    </DndProvider>
  )
}
