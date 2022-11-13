import Screen from 'components/atoms/screen'
import { Content } from 'components/pages/colegiado/lista/content'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function ListaHomologacao() {
  useEffect(() => {
    store.dispatch(actions.colegiado.list({ page: 1, per_page: 5, term: null }))
  }, [])

  return (
    <Screen py="24px">
      <Content />
    </Screen>
  )
}
