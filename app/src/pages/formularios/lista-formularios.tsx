import Screen from 'components/atoms/screen'

import { Content } from 'components/pages/formularios/content'
import { useStore } from 'hooks/useStore'

export default function Formularios() {
  useStore(['formulario'])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
