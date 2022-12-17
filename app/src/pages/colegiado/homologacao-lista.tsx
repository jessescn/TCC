import Screen from 'components/atoms/screen'
import ProcessosHomologacaoList from 'components/pages/colegiado/homologacao-lista'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function ProcessosHomologacaoListPage() {
  useEffect(() => {
    store.dispatch(actions.colegiado.list({ page: 1, per_page: 5, term: null }))
  }, [])

  return (
    <Screen py="24px">
      <ProcessosHomologacaoList />
    </Screen>
  )
}
