import Screen from 'components/atoms/screen'
import { Content } from 'components/pages/meus-procedimentos/content'
import { useStore } from 'hooks/useStore'

export default function MeusProcedimentos() {
  useStore(['procedimento'])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
