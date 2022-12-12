import Screen from 'components/atoms/screen'
import { Content } from 'components/pages/usuarios/lista'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function TodosUsuarios() {
  useEffect(() => {
    store.dispatch(actions.userDetalhes.reset())
    store.dispatch(actions.user.list({ page: 1, per_page: 5, term: null }))
  }, [])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}