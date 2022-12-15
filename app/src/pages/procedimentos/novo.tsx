import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'
import Content from 'components/pages/procedimentos/novo/content'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

export default function NovoProcedimento() {
  const { id } = useParams()

  const isLoading = useSelector(
    selectors.tipoProcedimentoDetalhes.isLoadingContent
  )

  useEffect(() => {
    if (id) {
      store.dispatch(actions.tipoProcedimentoDetalhes.getInfo(id))
    }
  }, [id])

  return (
    <Screen py="24px" h="100%" alignItems={isLoading ? 'center' : 'flex-start'}>
      {isLoading ? <LoadingPage /> : <Content />}
    </Screen>
  )
}
