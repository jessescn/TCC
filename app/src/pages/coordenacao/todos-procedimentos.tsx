import Screen from 'components/atoms/screen'
import TodosProcedimentosList from 'components/pages/coordenacao/todos-procedimentos'
import { useEffect } from 'react'

import { actions, store } from 'store'

export default function TodosProcedimentosListPage() {
  useEffect(() => {
    store.dispatch(
      actions.procedimento.list({ page: 1, per_page: 5, term: null })
    )
  }, [])

  return (
    <Screen py="24px">
      <TodosProcedimentosList />
    </Screen>
  )
}
