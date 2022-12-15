import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'

import Content from 'components/pages/usuarios/detalhes'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function DetalhesUsuario() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const isLoading = useSelector(selectors.userDetalhes.isLoadingContent)

  useEffect(() => {
    if (id) {
      store.dispatch(actions.userDetalhes.getInfo(Number(id)))
    }
  }, [])

  return (
    <Screen py="24px" alignItems={isLoading ? 'center' : 'flex-start'}>
      {isLoading ? <LoadingPage /> : <Content />}
    </Screen>
  )
}
