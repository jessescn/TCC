import Screen from 'components/atoms/screen'

import { Content } from 'components/pages/tipo-procedimentos/content'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function TipoProcedimentos() {
  useEffect(() => {
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
