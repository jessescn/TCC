import Screen from 'components/atoms/screen'
import { LoadingPage } from 'components/molecules/loading'
import Content from 'components/pages/procedimentos/detalhes/content'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { actions, selectors, store, useSelector } from 'store'

const DetalhesProcedimento = () => {
  const { id } = useParams()

  const isLoading = useSelector(selectors.procedimentoDetalhes.isLoadingContent)

  useEffect(() => {
    store.dispatch(actions.procedimentoDetalhes.getInfo(Number(id)))
  }, [])

  return (
    <Screen py="24px" alignItems={isLoading ? 'center' : 'flex-start'}>
      {isLoading ? <LoadingPage /> : <Content />}
    </Screen>
  )
}

export default DetalhesProcedimento
