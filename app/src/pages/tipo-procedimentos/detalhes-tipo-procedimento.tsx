import Screen from 'components/atoms/screen'

import Content from 'components/pages/tipo-procedimento/content'
import { useStore } from 'hooks/useStore'

export default function DetalhesTipoProcedimento() {
  useStore(['tipoProcedimento', 'formulario'])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
