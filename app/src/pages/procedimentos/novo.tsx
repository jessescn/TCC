import Screen from 'components/atoms/screen'
import Content from 'components/pages/procedimentos/novo/content'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, store } from 'store'

export default function NovoProcedimento() {
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      store.dispatch(actions.tipoProcedimentoDetalhes.getInfo(id))
    }
  }, [id])

  return (
    <Screen py="24px" h="100%">
      <Content />
    </Screen>
  )
}
