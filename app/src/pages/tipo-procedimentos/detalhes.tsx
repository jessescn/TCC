import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'

import TipoProcedimentoDetails from 'components/pages/tipo-procedimentos/detalhes'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function TipoProcedimentoDetailsPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const isLoading = useSelector(
    selectors.tipoProcedimentoDetalhes.isLoadingContent
  )

  useEffect(() => {
    store.dispatch(actions.tipoProcedimentoDetalhes.getInfo(id))
  }, [])

  return (
    <Screen py="24px" alignItems={isLoading ? 'center' : 'flex-start'}>
      {isLoading ? <LoadingPage /> : <TipoProcedimentoDetails />}
    </Screen>
  )
}
