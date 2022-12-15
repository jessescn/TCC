import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'

import FormularioDetails from 'components/pages/formularios/detalhes'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function Form() {
  const isLoading = useSelector(selectors.formularioDetalhes.isLoadingContent)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    store.dispatch(actions.formularioDetalhes.getInfo(id))
  }, [])

  return (
    <Screen
      py="24px"
      pos="relative"
      alignItems={isLoading ? 'center' : 'flex-start'}
    >
      {isLoading ? <LoadingPage /> : <FormularioDetails />}
    </Screen>
  )
}
