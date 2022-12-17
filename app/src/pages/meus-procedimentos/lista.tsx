import Screen from 'components/atoms/screen'
import MeusProcedimentosList from 'components/pages/meus-procedimentos/lista/content'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function MeusProcedimentosListPage() {
  useEffect(() => {
    store.dispatch(
      actions.meusProcedimentos.list({ page: 1, per_page: 5, term: null })
    )
  }, [])

  return (
    <Screen py="24px">
      <MeusProcedimentosList />
    </Screen>
  )
}
