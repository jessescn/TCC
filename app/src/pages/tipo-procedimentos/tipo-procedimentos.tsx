import Screen from 'components/atoms/screen'

import { Content } from 'components/pages/tipo-procedimentos/content'
import { useStore } from 'hooks/useStore'

export default function TipoProcedimentos() {
  useStore(['tipoProcedimento'])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
