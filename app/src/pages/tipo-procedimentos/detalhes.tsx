import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'

import Content from 'components/pages/tipo-procedimentos/detalhes/content'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function DetalhesTipoProcedimento() {
  const isLoading = useSelector(
    selectors.tipoProcedimentoDetalhes.isLoadingContent
  )

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    store.dispatch(actions.tipoProcedimentoDetalhes.getInfo(id))
  }, [])

  return (
    <Screen py="24px" alignItems={isLoading ? 'center' : 'flex-start'}>
      {isLoading ? <LoadingPage /> : <Content />}
    </Screen>
  )
}
