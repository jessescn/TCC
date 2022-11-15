import Screen from 'components/atoms/screen'

import Content from 'components/pages/tipo-procedimentos/detalhes/content'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, store } from 'store'

export default function DetalhesTipoProcedimento() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    store.dispatch(actions.tipoProcedimentoDetalhes.getInfo(id))
  }, [])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
