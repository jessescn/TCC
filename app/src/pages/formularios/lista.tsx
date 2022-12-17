import Screen from 'components/atoms/screen'

import FormulariosList from 'components/pages/formularios/lista'
import { useEffect } from 'react'
import { actions, store } from 'store'

export default function FormulariosListPage() {
  useEffect(() => {
    store.dispatch(
      actions.formulario.list({ page: 1, per_page: 5, term: null })
    )
    store.dispatch(actions.formularioDetalhes.resetState())
  }, [])

  return (
    <Screen py="24px">
      <FormulariosList />
    </Screen>
  )
}
