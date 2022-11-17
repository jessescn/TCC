import Screen from 'components/atoms/screen'

import FormularioDetails from 'components/pages/formularios/detalhes'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, store } from 'store'

export default function Form() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    store.dispatch(actions.formularioDetalhes.getInfo(id))
  }, [])

  return (
    <Screen py="24px">
      <FormularioDetails />
    </Screen>
  )
}
