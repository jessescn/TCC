import Screen from 'components/atoms/screen'

import { Content } from 'components/pages/tipo-procedimentos/lista/content'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function TipoProcedimentos() {
  useEffect(() => {
    store.dispatch(actions.tipoProcedimentoDetalhes.resetStatus())
    store.dispatch(actions.tipoProcedimento.resetStatus())
    store.dispatch(
      actions.tipoProcedimento.list({ page: 1, per_page: 5, term: null })
    )
  }, [])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
