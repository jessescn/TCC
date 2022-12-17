import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'

import FormularioDetails from 'components/pages/formularios/detalhes'
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function FormularioDetailsPage() {
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
      <DndProvider backend={HTML5Backend}>
        {isLoading ? <LoadingPage /> : <FormularioDetails />}
      </DndProvider>
    </Screen>
  )
}
