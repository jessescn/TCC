import Screen from 'components/atoms/screen'
import Content from 'components/pages/coordenacao/analise-procedimento/content'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, store } from 'store'

export default function AnaliseProcedimento() {
  const { id } = useParams()

  useEffect(() => {
    store.dispatch(actions.procedimentoDetalhes.getInfo(Number(id)))
  }, [])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
